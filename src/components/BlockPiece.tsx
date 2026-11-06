/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BlockColorKey, Piece, BoardTheme } from '../types/game';
import { COLOR_THEMES } from '../utils/pieces';
import { BOARD_THEMES, getNeonComboConfig } from '../utils/themes';

interface BlockPieceProps {
  piece: Piece;
  cellSize?: number; // Size in px per grid block
  isDragging?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const BlockPiece: React.FC<BlockPieceProps> = ({
  piece,
  cellSize = 32,
  isDragging = false,
  isSelected = false,
  disabled = false,
  onClick,
  onPointerDown,
}) => {
  const theme = COLOR_THEMES[piece.colorKey];
  const gap = 3;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      onPointerDown={!disabled ? onPointerDown : undefined}
      className={`relative inline-flex flex-col select-none touch-none transition-transform duration-150 ${
        disabled
          ? 'opacity-35 cursor-not-allowed grayscale-[40%]'
          : 'cursor-grab active:cursor-grabbing hover:scale-105'
      } ${isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : ''} ${
        isDragging ? 'opacity-90 scale-105 pointer-events-none' : ''
      }`}
      style={{
        gap: `${gap}px`,
      }}
    >
      {piece.shape.map((row, r) => (
        <div key={r} className="flex" style={{ gap: `${gap}px` }}>
          {row.map((active, c) => {
            if (!active) {
              return (
                <div
                  key={c}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                  }}
                  className="invisible"
                />
              );
            }

            const blockType = piece.blockTypes?.[r]?.[c] || 'standard';

            return (
              <div
                key={c}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: theme.primary,
                  borderColor: `${theme.bevelHighlight} ${theme.bevelShadow} ${theme.bevelShadow} ${theme.bevelHighlight}`,
                }}
                className={`relative rounded-md border-[2.5px] shadow-[0_2px_4px_rgba(0,0,0,0.4)] overflow-hidden transform-gpu select-none`}
              >
                {/* 3D Inner Face with subtle bevel inset */}
                <div
                  className="absolute inset-[1.5px] rounded-[3px] overflow-hidden flex items-center justify-center pointer-events-none"
                  style={{
                    backgroundColor: theme.faceColor,
                    backgroundImage: `linear-gradient(135deg, ${theme.bevelHighlight}40 0%, transparent 60%)`,
                  }}
                >
                  {/* Multiple block types preview in tray */}
                  {blockType === 'diamond' ? (
                    <span className="text-[12px] sm:text-sm select-none drop-shadow-[0_0_6px_rgba(56,189,248,0.9)] animate-pulse">
                      💎
                    </span>
                  ) : blockType === 'star' ? (
                    <span className="text-[11px] sm:text-xs select-none drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]">
                      ⭐
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Render single isolated cell block on the grid
interface CellProps {
  colorKey?: BlockColorKey;
  hasGem?: boolean;
  blockType?: 'standard' | 'diamond' | 'neon' | 'star';
  clearing?: boolean;
  isGhost?: boolean;
  isHighlighted?: boolean;
  size?: number;
  boardTheme?: BoardTheme;
  row?: number;
  col?: number;
  combo?: number;
  customPhotoUrl?: string | null;
}

export const GridBlockCell: React.FC<CellProps> = ({
  colorKey,
  hasGem = false,
  blockType = 'standard',
  clearing = false,
  isGhost = false,
  isHighlighted = false,
  size,
  boardTheme = 'sky_blue',
  row = 0,
  col = 0,
  combo = 0,
  customPhotoUrl = null,
}) => {
  const themeConfig = BOARD_THEMES[boardTheme] || BOARD_THEMES.sky_blue;

  if (!colorKey) {
    // Empty cell slot themed
    return (
      <div
        style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
        className={`w-full h-full rounded-md transition-colors duration-150 flex items-center justify-center ${
          isHighlighted
            ? `${themeConfig.cellEmptyBg} ring-2 ${themeConfig.ringGlow} shadow-[inset_0_0_10px_rgba(255,255,255,0.25)]`
            : `${themeConfig.cellEmptyBg} border ${themeConfig.cellEmptyBorder} shadow-[inset_0_1px_2px_rgba(0,0,0,0.45)]`
        }`}
      />
    );
  }

  const pieceColorTheme = COLOR_THEMES[colorKey];

  if (isGhost) {
    return (
      <div
        style={size ? { width: `${size}px`, height: `${size}px` } : undefined}
        className={`w-full h-full rounded-lg bg-gradient-to-br ${pieceColorTheme.gradient} opacity-60 ring-2 ring-white/80 animate-pulse flex items-center justify-center`}
      >
        <div className="w-2 h-2 rounded-full bg-white/80" />
      </div>
    );
  }

  const isDiamond = hasGem || blockType === 'diamond';
  const isStar = blockType === 'star';
  const isNeon = blockType === 'neon';

  // Neon Cyber dynamic combo styles
  const isNeonTheme = boardTheme === 'neon';
  const neonComboCfg = isNeonTheme ? getNeonComboConfig(combo) : null;

  // Custom Photo Skin (tiles custom photo across grid blocks)
  const isPhotoTheme = boardTheme === 'photo_custom' && customPhotoUrl;

  return (
    <div
      style={{
        ...(size ? { width: `${size}px`, height: `${size}px` } : {}),
        backgroundColor: isPhotoTheme ? '#1e293b' : pieceColorTheme.primary,
        borderColor: isNeonTheme && neonComboCfg
          ? neonComboCfg.borderColor
          : `${pieceColorTheme.bevelHighlight} ${pieceColorTheme.bevelShadow} ${pieceColorTheme.bevelShadow} ${pieceColorTheme.bevelHighlight}`,
        boxShadow: isNeonTheme && neonComboCfg
          ? `0 0 ${8 + Math.min(18, combo * 4)}px ${neonComboCfg.cellGlow}`
          : '0 2px 4px rgba(0,0,0,0.35)',
      }}
      className={`relative w-full h-full rounded-md border-[2.5px] overflow-hidden transition-all transform-gpu select-none ${
        clearing
          ? 'scale-115 shadow-[0_0_24px_rgba(255,255,255,1)] ring-4 ring-white animate-ping duration-300'
          : isHighlighted
          ? 'brightness-125 ring-2 ring-white'
          : 'hover:brightness-105'
      }`}
    >
      {/* 3D Inner Face: Either custom photo tile or vibrant theme facet */}
      {isPhotoTheme ? (
        <div
          className="absolute inset-[1px] rounded-[2px] overflow-hidden"
          style={{
            backgroundImage: `url(${customPhotoUrl})`,
            backgroundSize: '800% 800%',
            backgroundPosition: `${(col / 7) * 100}% ${(row / 7) * 100}%`,
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.4)',
          }}
        />
      ) : (
        <div
          className="absolute inset-[1.5px] rounded-[3px] overflow-hidden flex items-center justify-center pointer-events-none"
          style={{
            backgroundColor: pieceColorTheme.faceColor,
            backgroundImage: `linear-gradient(135deg, ${pieceColorTheme.bevelHighlight}40 0%, transparent 60%)`,
          }}
        >
          {/* Multiple Block Types & 💎 Diamond Emoji Rendering */}
          {isDiamond ? (
            <span className="text-base sm:text-lg select-none drop-shadow-[0_0_10px_rgba(56,189,248,1)] animate-pulse">
              💎
            </span>
          ) : isStar ? (
            <span className="text-sm sm:text-base select-none drop-shadow-[0_0_8px_rgba(251,191,36,1)] animate-bounce">
              ⭐
            </span>
          ) : isNeon ? (
            <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)] animate-pulse" />
          ) : null}
        </div>
      )}
    </div>
  );
};
