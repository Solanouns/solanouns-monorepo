use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

declare_id!("AHUe7A3p1G2kLTPVeQ1oFLBzQQNzf8G2wMxE3QVrjKpn");

#[program]
pub mod solanouns_auction_house {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        auction_duration: i64,
        reserve_price: u64,
        min_bid_increment_percentage: u8,
    ) -> Result<()> {
        let auction_house = &mut ctx.accounts.auction_house;
        auction_house.authority = ctx.accounts.authority.key();
        auction_house.treasury = ctx.accounts.treasury.key();
        auction_house.auction_duration = auction_duration;
        auction_house.reserve_price = reserve_price;
        auction_house.min_bid_increment_percentage = min_bid_increment_percentage;
        auction_house.time_buffer = 5 * 60; // 5 minutes
        auction_house.paused = false;
        
        msg!("Auction House initialized");
        Ok(())
    }

    pub fn create_auction(ctx: Context<CreateAuction>, token_id: u64) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let auction_house = &ctx.accounts.auction_house;
        let clock = Clock::get()?;

        auction.token_id = token_id;
        auction.amount = 0;
        auction.start_time = clock.unix_timestamp;
        auction.end_time = clock.unix_timestamp + auction_house.auction_duration;
        auction.bidder = Pubkey::default();
        auction.settled = false;

        msg!("Auction created for token {}", token_id);
        Ok(())
    }

    pub fn create_bid(ctx: Context<CreateBid>, amount: u64) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let auction_house = &ctx.accounts.auction_house;
        let clock = Clock::get()?;

        require!(
            clock.unix_timestamp < auction.end_time,
            AuctionHouseError::AuctionExpired
        );
        
        require!(!auction.settled, AuctionHouseError::AuctionAlreadySettled);
        
        require!(
            amount >= auction_house.reserve_price,
            AuctionHouseError::BidTooLow
        );

        if auction.amount > 0 {
            let min_increment = auction.amount * auction_house.min_bid_increment_percentage as u64 / 100;
            require!(
                amount >= auction.amount + min_increment,
                AuctionHouseError::BidTooLow
            );

            // Refund previous bidder
            if auction.bidder != Pubkey::default() {
                // Transfer SOL back to previous bidder
                **ctx.accounts.bidder.to_account_info().try_borrow_mut_lamports()? += auction.amount;
                **ctx.accounts.auction_house.to_account_info().try_borrow_mut_lamports()? -= auction.amount;
            }
        }

        // Extend auction if bid is within time buffer
        if clock.unix_timestamp > auction.end_time - auction_house.time_buffer {
            auction.end_time = clock.unix_timestamp + auction_house.time_buffer;
        }

        // Transfer bid amount from bidder to auction house
        **ctx.accounts.bidder.to_account_info().try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.auction_house.to_account_info().try_borrow_mut_lamports()? += amount;

        auction.amount = amount;
        auction.bidder = ctx.accounts.bidder.key();

        msg!("Bid placed: {} SOL for token {}", amount, auction.token_id);
        Ok(())
    }

    pub fn settle_auction(ctx: Context<SettleAuction>) -> Result<()> {
        let auction = &mut ctx.accounts.auction;
        let auction_house = &ctx.accounts.auction_house;
        let clock = Clock::get()?;

        require!(
            clock.unix_timestamp >= auction.end_time,
            AuctionHouseError::AuctionNotEnded
        );
        
        require!(!auction.settled, AuctionHouseError::AuctionAlreadySettled);

        if auction.bidder != Pubkey::default() && auction.amount > 0 {
            // Transfer NFT to winner
            token::transfer(
                CpiContext::new(
                    ctx.accounts.token_program.to_account_info(),
                    token::Transfer {
                        from: ctx.accounts.from_token_account.to_account_info(),
                        to: ctx.accounts.to_token_account.to_account_info(),
                        authority: ctx.accounts.authority.to_account_info(),
                    },
                ),
                1,
            )?;

            // Transfer bid amount to treasury
            **ctx.accounts.treasury.to_account_info().try_borrow_mut_lamports()? += auction.amount;
            **ctx.accounts.auction_house.to_account_info().try_borrow_mut_lamports()? -= auction.amount;
        }

        auction.settled = true;
        
        msg!("Auction settled for token {}", auction.token_id);
        Ok(())
    }

    pub fn pause_auction_house(ctx: Context<PauseAuctionHouse>) -> Result<()> {
        let auction_house = &mut ctx.accounts.auction_house;
        auction_house.paused = true;
        Ok(())
    }

    pub fn unpause_auction_house(ctx: Context<UnpauseAuctionHouse>) -> Result<()> {
        let auction_house = &mut ctx.accounts.auction_house;
        auction_house.paused = false;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + AuctionHouse::LEN,
        seeds = [b"auction_house"],
        bump
    )]
    pub auction_house: Account<'info, AuctionHouse>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    /// CHECK: This is the treasury account
    pub treasury: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(token_id: u64)]
pub struct CreateAuction<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Auction::LEN,
        seeds = [b"auction", token_id.to_le_bytes().as_ref()],
        bump
    )]
    pub auction: Account<'info, Auction>,
    
    pub auction_house: Account<'info, AuctionHouse>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateBid<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    
    #[account(mut)]
    pub auction_house: Account<'info, AuctionHouse>,
    
    #[account(mut)]
    pub bidder: Signer<'info>,
}

#[derive(Accounts)]
pub struct SettleAuction<'info> {
    #[account(mut)]
    pub auction: Account<'info, Auction>,
    
    #[account(mut)]
    pub auction_house: Account<'info, AuctionHouse>,
    
    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>,
    
    /// CHECK: This is the treasury account
    #[account(mut)]
    pub treasury: AccountInfo<'info>,
    
    pub authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct PauseAuctionHouse<'info> {
    #[account(
        mut,
        has_one = authority,
    )]
    pub auction_house: Account<'info, AuctionHouse>,
    
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct UnpauseAuctionHouse<'info> {
    #[account(
        mut,
        has_one = authority,
    )]
    pub auction_house: Account<'info, AuctionHouse>,
    
    pub authority: Signer<'info>,
}

#[account]
pub struct AuctionHouse {
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub auction_duration: i64,
    pub reserve_price: u64,
    pub min_bid_increment_percentage: u8,
    pub time_buffer: i64,
    pub paused: bool,
}

impl AuctionHouse {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 1 + 8 + 1;
}

#[account]
pub struct Auction {
    pub token_id: u64,
    pub amount: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub bidder: Pubkey,
    pub settled: bool,
}

impl Auction {
    pub const LEN: usize = 8 + 8 + 8 + 8 + 32 + 1;
}

#[error_code]
pub enum AuctionHouseError {
    #[msg("Auction has expired")]
    AuctionExpired,
    #[msg("Auction has not ended yet")]
    AuctionNotEnded,
    #[msg("Auction already settled")]
    AuctionAlreadySettled,
    #[msg("Bid amount too low")]
    BidTooLow,
}