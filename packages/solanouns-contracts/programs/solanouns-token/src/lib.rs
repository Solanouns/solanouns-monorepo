use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint};
use anchor_spl::metadata::{
    create_metadata_accounts_v3, CreateMetadataAccountsV3,
    mpl_token_metadata::types::{DataV2, Creator, Collection},
};

declare_id!("HGmLX7h2DP2BkAr1Q3q2qLWXGvF1uw1Rk8aBxD7eBdRp");

#[program]
pub mod solanouns_token {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let solanouns_config = &mut ctx.accounts.solanouns_config;
        solanouns_config.authority = ctx.accounts.authority.key();
        solanouns_config.minter = ctx.accounts.minter.key();
        solanouns_config.descriptor = ctx.accounts.descriptor.key();
        solanouns_config.seeder = ctx.accounts.seeder.key();
        solanouns_config.current_token_id = 0;
        solanouns_config.total_supply = 0;
        solanouns_config.founders_reward = 10; // 10% to founders
        Ok(())
    }

    pub fn mint(ctx: Context<Mint>) -> Result<()> {
        let solanouns_config = &mut ctx.accounts.solanouns_config;
        let token_id = solanouns_config.current_token_id;
        
        // Generate metadata
        let name = format!("Solanouns {}", token_id);
        let symbol = "SOLANOUNS".to_string();
        let uri = format!("https://api.solanouns.com/metadata/{}", token_id);
        
        let metadata = DataV2 {
            name,
            symbol,
            uri,
            seller_fee_basis_points: 500, // 5% royalty
            creators: Some(vec![
                Creator {
                    address: solanouns_config.authority,
                    verified: false,
                    share: 100,
                }
            ]),
            collection: None,
            uses: None,
        };

        // Create metadata account
        create_metadata_accounts_v3(
            CpiContext::new(
                ctx.accounts.token_metadata_program.to_account_info(),
                CreateMetadataAccountsV3 {
                    metadata: ctx.accounts.metadata.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    mint_authority: ctx.accounts.mint_authority.to_account_info(),
                    update_authority: ctx.accounts.update_authority.to_account_info(),
                    payer: ctx.accounts.payer.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
            ),
            metadata,
            false, // is_mutable
            true,  // update_authority_is_signer
            None,  // collection_details
        )?;

        // Mint the token
        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.mint_authority.to_account_info(),
                },
            ),
            1,
        )?;

        solanouns_config.current_token_id += 1;
        solanouns_config.total_supply += 1;

        Ok(())
    }

    pub fn transfer(ctx: Context<Transfer>) -> Result<()> {
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.from.to_account_info(),
                    to: ctx.accounts.to.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            1,
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + SolanounsConfig::LEN,
        seeds = [b"solanouns_config"],
        bump
    )]
    pub solanouns_config: Account<'info, SolanounsConfig>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    /// CHECK: This is the minter account
    pub minter: AccountInfo<'info>,
    
    /// CHECK: This is the descriptor account
    pub descriptor: AccountInfo<'info>,
    
    /// CHECK: This is the seeder account
    pub seeder: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Mint<'info> {
    #[account(mut)]
    pub solanouns_config: Account<'info, SolanounsConfig>,
    
    #[account(
        init,
        payer = payer,
        mint::decimals = 0,
        mint::authority = mint_authority,
    )]
    pub mint: Account<'info, Mint>,
    
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = to,
    )]
    pub token_account: Account<'info, TokenAccount>,
    
    /// CHECK: This is the metadata account
    #[account(mut)]
    pub metadata: AccountInfo<'info>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    /// CHECK: This is the recipient
    pub to: AccountInfo<'info>,
    
    /// CHECK: This is the mint authority
    pub mint_authority: Signer<'info>,
    
    /// CHECK: This is the update authority
    pub update_authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
    
    /// CHECK: This is the token metadata program
    pub token_metadata_program: AccountInfo<'info>,
    
    pub system_program: Program<'info, System>,
    
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub from: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub to: Account<'info, TokenAccount>,
    
    pub authority: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct SolanounsConfig {
    pub authority: Pubkey,
    pub minter: Pubkey,
    pub descriptor: Pubkey,
    pub seeder: Pubkey,
    pub current_token_id: u64,
    pub total_supply: u64,
    pub founders_reward: u8,
}

impl SolanounsConfig {
    pub const LEN: usize = 32 + 32 + 32 + 32 + 8 + 8 + 1;
}