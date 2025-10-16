import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';

import solanounsData from './solanouns-data.json';
import { NounSeed, NounData, TraitData } from './types';

const { bgcolors, traits } = solanounsData;
const { bodies, accessories, heads, glasses } = traits;

/**
 * Get trait data using a Noun seed
 * @param seed The Noun seed
 */
export const getNounData = (seed: NounSeed): NounData => {
  return {
    parts: [
      { filename: bodies[seed.body].filename, data: '' },
      { filename: accessories[seed.accessory].filename, data: '' },
      { filename: heads[seed.head].filename, data: '' },
      { filename: glasses[seed.glasses].filename, data: '' },
    ],
    background: bgcolors[seed.background],
  };
};

/**
 * Generate a random Noun seed
 * @param seed The Noun seed
 */
export const getRandomNounSeed = (): NounSeed => {
  return {
    background: Math.floor(Math.random() * bgcolors.length),
    body: Math.floor(Math.random() * bodies.length),
    accessory: Math.floor(Math.random() * accessories.length),
    head: Math.floor(Math.random() * heads.length),
    glasses: Math.floor(Math.random() * glasses.length),
  };
};

/**
 * Emulate bitwise right shift and uint cast
 * @param value A Big Number
 * @param shiftAmount The amount to right shift
 * @param uintSize The uint bit size to cast to
 */
export const shiftRightAndCast = (
  value: BigNumberish,
  shiftAmount: number,
  uintSize: number,
): string => {
  const shifted = BigNumber.from(value).shr(shiftAmount).toHexString();
  return `0x${shifted.substring(shifted.length - uintSize / 4)}`;
};

/**
 * Emulates the NounsSeeder.sol methodology for pseudorandomly selecting a part
 * @param pseudorandomness Hex representation of a number
 * @param partCount The number of parts to pseudorandomly choose from
 * @param shiftAmount The amount to right shift
 * @param uintSize The size of the unsigned integer
 */
export const getPseudorandomPart = (
  pseudorandomness: string,
  partCount: number,
  shiftAmount: number,
  uintSize = 48,
): number => {
  const hex = shiftRightAndCast(pseudorandomness, shiftAmount, uintSize);
  return BigNumber.from(hex).mod(partCount).toNumber();
};

/**
 * Emulates the NounsSeeder.sol methodology for generating a Noun seed
 * @param nounId The Noun tokenId used to create pseudorandomness
 * @param blockHash The block hash use to create pseudorandomness
 */
export const getNounSeedFromBlockHash = (nounId: BigNumberish, blockHash: string): NounSeed => {
  const pseudorandomness = solidityKeccak256(['bytes32', 'uint256'], [blockHash, nounId]);
  return {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
    accessory: getPseudorandomPart(pseudorandomness, accessories.length, 96),
    head: getPseudorandomPart(pseudorandomness, heads.length, 144),
    glasses: getPseudorandomPart(pseudorandomness, glasses.length, 192),
  };
};

/**
 * Get trait filename for one trait
 * @param partType The label of the part type to use
 * @param partIndex The index within the trait data array of the part to get
 */
export const getPartData = (partType: string, partIndex: number): string => {
  const traitMap: Record<string, TraitData[]> = {
    bodies,
    accessories,
    heads,
    glasses,
  };
  
  const traitArray = traitMap[partType];
  if (!traitArray || !traitArray[partIndex]) {
    throw new Error(`Invalid part type "${partType}" or index ${partIndex}`);
  }
  
  return traitArray[partIndex].filename;
};
