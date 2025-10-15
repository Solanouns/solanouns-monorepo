import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SolanounsAPI, SolanounMetadata } from '../../services/api';

interface SolanounCardProps {
  tokenId: number;
  className?: string;
}

export const SolanounCard: React.FC<SolanounCardProps> = ({ tokenId, className = '' }) => {
  const { data: metadata, isLoading, error } = useQuery({
    queryKey: ['solanoun', tokenId],
    queryFn: () => SolanounsAPI.getMetadata(tokenId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
        <div className="w-full h-64 bg-red-100 dark:bg-red-900 flex items-center justify-center">
          <span className="text-red-600 dark:text-red-400">Failed to load</span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Solanoun {tokenId}</h3>
          <p className="text-gray-600 dark:text-gray-400">Error loading metadata</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
      <div className="w-full h-64 overflow-hidden">
        <img
          src={SolanounsAPI.getImageUrl(tokenId)}
          alt={metadata?.name || `Solanoun ${tokenId}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {metadata?.name || `Solanoun ${tokenId}`}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {metadata?.description || 'A unique Solanoun NFT'}
        </p>
        {metadata?.attributes && (
          <div className="space-y-1">
            {metadata.attributes.slice(0, 3).map((attr, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">{attr.trait_type}:</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{attr.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface SolanounGridProps {
  tokenIds: number[];
  className?: string;
}

export const SolanounGrid: React.FC<SolanounGridProps> = ({ tokenIds, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {tokenIds.map((tokenId) => (
        <SolanounCard key={tokenId} tokenId={tokenId} />
      ))}
    </div>
  );
};

export default SolanounCard;