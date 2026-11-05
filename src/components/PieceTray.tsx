/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Piece } from '../types/game';
import { BlockPiece } from './BlockPiece';

interface PieceTrayProps {
  pieces: (Piece | null)[];
  selectedPieceIndex: number | null;
  draggingIndex: number | null;
  validityMap: boolean[]; // whether piece[i] can fit anywhere on board
  onSelectPiece: (index: number) => void;
  onPointerDownPiece: (index: number, e: React.PointerEvent) => void;
}

export const PieceTray: React.FC<PieceTrayProps> = ({
  pieces,
  selectedPieceIndex,
  draggingIndex,
  validityMap,
  onSelectPiece,
  onPointerDownPiece,
}) => {
  return (
    <div className="w-full max-w-md flex items-center justify-around gap-2 px-3 py-4 select-none">
      {pieces.map((piece, idx) => {
        if (!piece) {
          // Empty slot after piece was placed
          return (
            <div
              key={idx}
              className="flex-1 min-w-[80px] h-28 flex items-center justify-center opacity-0"
            />
          );
        }

        const isDragging = draggingIndex === idx;
        const isSelected = selectedPieceIndex === idx;
        const canFit = validityMap[idx] ?? true;

        // Dynamic block size based on shape dimensions so large shapes fit nicely
        const maxDim = Math.max(piece.width, piece.height);
        const cellSize = maxDim >= 5 ? 16 : maxDim >= 4 ? 20 : maxDim >= 3 ? 24 : 28;

        return (
          <div
            key={piece.id}
            className={`flex-1 min-w-[80px] h-28 flex items-center justify-center p-2 rounded-2xl transition-all duration-150 relative cursor-grab active:cursor-grabbing ${
              isSelected ? 'scale-110 drop-shadow-lg' : ''
            }`}
          >
            {/* If currently dragging, leave a faint placeholder */}
            {isDragging ? (
              <div className="opacity-15 scale-95 pointer-events-none">
                <BlockPiece
                  piece={piece}
                  cellSize={cellSize}
                  disabled={true}
                />
              </div>
            ) : (
              <BlockPiece
                piece={piece}
                cellSize={cellSize}
                disabled={!canFit}
                isSelected={isSelected}
                onClick={() => onSelectPiece(idx)}
                onPointerDown={(e) => onPointerDownPiece(idx, e)}
              />
            )}

            {!canFit && !isDragging && (
              <div className="absolute -bottom-1 text-[10px] font-bold text-rose-300/80 uppercase tracking-wider pointer-events-none">
                No Room
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
