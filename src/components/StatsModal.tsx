/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Trophy,
  Flame,
  Layers,
  Calendar,
  TrendingUp,
  Activity,
  Target,
  Award,
  Sparkles,
} from 'lucide-react';
import { get30DayStatsSummary, DailyScoreHistoryPoint } from '../utils/statsHistory';
import { sounds } from '../utils/audio';

interface StatsModalProps {
  onClose: () => void;
  highScore: number;
}

export const StatsModal: React.FC<StatsModalProps> = ({ onClose, highScore }) => {
  const [selectedRange, setSelectedRange] = useState<7 | 14 | 30>(30);
  const [hoveredPoint, setHoveredPoint] = useState<DailyScoreHistoryPoint | null>(null);

  // Compute 30-day stats
  const statsSummary = useMemo(() => get30DayStatsSummary(highScore), [highScore]);

  // Filter history based on selected range
  const filteredHistory = useMemo(() => {
    return statsSummary.history.slice(-selectedRange);
  }, [statsSummary.history, selectedRange]);

  // Lifetime metrics from localStorage
  const gamesPlayed = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('blockblast_games_played') || '0', 10)
    : 0;
  const totalLines = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('blockblast_total_lines') || '0', 10)
    : 0;
  const bestCombo = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('blockblast_best_combo') || '0', 10)
    : 0;
  const dailyStreak = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('blockblast_daily_streak') || '1', 10)
    : 1;

  // Chart dimensions & coordinates
  const svgWidth = 480;
  const svgHeight = 180;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 30;

  const chartWidth = svgWidth - padLeft - padRight;
  const chartHeight = svgHeight - padTop - padBottom;

  const maxScore = useMemo(() => {
    const scores = filteredHistory.map((h) => h.score);
    const peak = Math.max(...scores, 100);
    // Round up to nice round ceiling
    const magnitude = Math.pow(10, Math.floor(Math.log10(peak)));
    return Math.ceil(peak / magnitude) * magnitude;
  }, [filteredHistory]);

  const minScore = 0;

  // Calculate coordinates for all data points
  const points = useMemo(() => {
    const count = filteredHistory.length;
    return filteredHistory.map((pt, index) => {
      const x = padLeft + (index / (count - 1 || 1)) * chartWidth;
      const normalizedY = (pt.score - minScore) / (maxScore - minScore || 1);
      const y = padTop + chartHeight - normalizedY * chartHeight;
      return { ...pt, x, y };
    });
  }, [filteredHistory, maxScore, minScore, chartWidth, chartHeight, padLeft, padTop]);

  // SVG Line Path
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((path, pt, index) => {
      if (index === 0) return `M ${pt.x} ${pt.y}`;
      // Smooth cubic bezier curve between points
      const prev = points[index - 1];
      const cx = (prev.x + pt.x) / 2;
      return `${path} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');
  }, [points]);

  // SVG Closed Area Path for gradient fill
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = padTop + chartHeight;
    const first = points[0];
    const last = points[points.length - 1];
    return `${linePath} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  }, [linePath, points, padTop, chartHeight]);

  // Peak point
  const peakPoint = useMemo(() => {
    return points.reduce((max, p) => (p.score > max.score ? p : max), points[0]);
  }, [points]);

  // Today point
  const todayPoint = points[points.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg rounded-[28px] bg-[#111726] border border-[#26354f] p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-white max-h-[94vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2a40] mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-2">
                Progress & Consistency
              </h2>
              <p className="text-xs text-slate-400">Daily score trends over the last 30 days</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* 4 Summary Consistency Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {/* Consistency Percentage */}
          <div className="p-2.5 rounded-2xl bg-[#172033] border border-[#23314d] flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-bold">Consistency</span>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-emerald-400 tabular-nums">
                {statsSummary.consistencyPercentage}%
              </span>
              <span className="text-[10px] text-emerald-300/80 font-bold">Stable</span>
            </div>
          </div>

          {/* 30-Day Average */}
          <div className="p-2.5 rounded-2xl bg-[#172033] border border-[#23314d] flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-bold">30D Average</span>
              <Target className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-black text-cyan-400 tabular-nums">
              {statsSummary.averageScore.toLocaleString()}
            </div>
          </div>

          {/* 30-Day Peak */}
          <div className="p-2.5 rounded-2xl bg-[#172033] border border-[#23314d] flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-bold">30D Peak</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-400 tabular-nums">
              {statsSummary.peakScore.toLocaleString()}
            </div>
          </div>

          {/* Growth Trend */}
          <div className="p-2.5 rounded-2xl bg-[#172033] border border-[#23314d] flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
              <span className="font-bold">Growth</span>
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            </div>
            <div className="text-xl font-black text-fuchsia-400 tabular-nums flex items-center gap-1">
              <span>{statsSummary.growthRate >= 0 ? `+${statsSummary.growthRate}%` : `${statsSummary.growthRate}%`}</span>
            </div>
          </div>
        </div>

        {/* Line Chart Card */}
        <div className="relative p-3 rounded-2xl bg-[#151c2d] border border-[#273650] mb-4">
          {/* Chart Header with Time Filter */}
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                Daily Score Progress
              </span>
            </div>

            {/* Range Toggle: 7D / 14D / 30D */}
            <div className="flex items-center bg-[#0d1322] rounded-lg p-0.5 border border-[#233047] gap-0.5">
              {([7, 14, 30] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedRange(r);
                    setHoveredPoint(null);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all cursor-pointer ${
                    selectedRange === r
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}D
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Tooltip Callout */}
          <div className="min-h-[26px] flex items-center justify-between px-2 mb-1 text-xs">
            {hoveredPoint ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <span className="font-bold text-slate-300">
                  {hoveredPoint.displayDate} {hoveredPoint.isToday ? '(Today)' : ''}:
                </span>
                <span className="font-black text-amber-400 tabular-nums">
                  {hoveredPoint.score.toLocaleString()} pts
                </span>
                <span className="text-[10px] text-slate-400">
                  ({hoveredPoint.linesCleared} lines cleared)
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                Hover or tap along the line to inspect daily consistency
              </span>
            )}
          </div>

          {/* SVG Line Chart */}
          <div className="w-full relative overflow-hidden flex justify-center">
            <svg
              className="w-full h-auto overflow-visible"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Area Gradient */}
                <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>

                {/* Line Gradient */}
                <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="60%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Horizontal Grid Lines & Y-Axis Labels */}
              {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                const yVal = padTop + chartHeight * (1 - ratio);
                const scoreLabel = Math.round(minScore + (maxScore - minScore) * ratio);
                return (
                  <g key={idx}>
                    <line
                      x1={padLeft}
                      y1={yVal}
                      x2={padLeft + chartWidth}
                      y2={yVal}
                      stroke="#273650"
                      strokeDasharray={idx === 0 ? undefined : '3 3'}
                      strokeWidth={1}
                    />
                    <text
                      x={padLeft - 8}
                      y={yVal + 3}
                      fill="#64748b"
                      fontSize={10}
                      fontWeight="bold"
                      textAnchor="end"
                      className="font-mono tabular-nums"
                    >
                      {scoreLabel >= 1000 ? `${(scoreLabel / 1000).toFixed(1)}k` : scoreLabel}
                    </text>
                  </g>
                );
              })}

              {/* Area Under Curve */}
              <path d={areaPath} fill="url(#chartAreaGrad)" />

              {/* Smooth Spline Line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#chartLineGrad)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />

              {/* Interactive Vertical Hover Guide */}
              {hoveredPoint && (
                <g>
                  {(() => {
                    const matched = points.find((p) => p.date === hoveredPoint.date);
                    if (!matched) return null;
                    return (
                      <>
                        <line
                          x1={matched.x}
                          y1={padTop}
                          x2={matched.x}
                          y2={padTop + chartHeight}
                          stroke="#38bdf8"
                          strokeDasharray="2 2"
                          strokeWidth={1.5}
                        />
                        <circle
                          cx={matched.x}
                          cy={matched.y}
                          r={6}
                          fill="#fef08a"
                          stroke="#0284c7"
                          strokeWidth={2.5}
                        />
                      </>
                    );
                  })()}
                </g>
              )}

              {/* Peak Point Crown Marker */}
              {peakPoint && (
                <g transform={`translate(${peakPoint.x}, ${peakPoint.y})`}>
                  <circle r={5} fill="#fbbf24" stroke="#78350f" strokeWidth={1.5} />
                  <circle r={9} fill="none" stroke="#fbbf24" strokeWidth={1} strokeDasharray="2 2" opacity={0.8} />
                </g>
              )}

              {/* Today Point Pulse Marker */}
              {todayPoint && (
                <g transform={`translate(${todayPoint.x}, ${todayPoint.y})`}>
                  <circle r={5} fill="#38bdf8" stroke="#ffffff" strokeWidth={2} />
                  <circle r={9} fill="none" stroke="#38bdf8" strokeWidth={1.5} className="animate-ping" opacity={0.6} />
                </g>
              )}

              {/* Invisible interactive hover target columns for easy finger/pointer touching */}
              {points.map((pt, idx) => {
                const colWidth = chartWidth / (points.length || 1);
                return (
                  <rect
                    key={idx}
                    x={pt.x - colWidth / 2}
                    y={padTop}
                    width={colWidth}
                    height={chartHeight + padBottom}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onTouchStart={() => setHoveredPoint(pt)}
                  />
                );
              })}

              {/* X-Axis Milestone Date Labels */}
              <g fill="#64748b" fontSize={10} fontWeight="bold">
                <text x={padLeft} y={svgHeight - 8} textAnchor="start">
                  {filteredHistory[0]?.displayDate}
                </text>
                {selectedRange === 30 && (
                  <text x={padLeft + chartWidth / 2} y={svgHeight - 8} textAnchor="middle">
                    {filteredHistory[15]?.displayDate}
                  </text>
                )}
                <text x={padLeft + chartWidth} y={svgHeight - 8} textAnchor="end" fill="#38bdf8">
                  Today
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Lifetime Record Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className="p-3 rounded-2xl bg-[#161c29] border border-[#232d3f] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">High Score</span>
              <span className="text-sm font-black text-white tabular-nums">
                {highScore.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#161c29] border border-[#232d3f] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Best Combo</span>
              <span className="text-sm font-black text-amber-400 tabular-nums">
                {bestCombo}x
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#161c29] border border-[#232d3f] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Total Lines</span>
              <span className="text-sm font-black text-cyan-400 tabular-nums">
                {totalLines.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#161c29] border border-[#232d3f] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">Daily Streak</span>
              <span className="text-sm font-black text-purple-400 tabular-nums">
                {dailyStreak} {dailyStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
        </div>

        {/* Games Played Footer Banner */}
        <div className="p-2.5 rounded-xl bg-[#141a28] border border-[#222c3f] flex items-center justify-between text-xs text-slate-400 mb-4 px-3">
          <span className="flex items-center gap-1.5 font-bold">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            Total Games Played:
          </span>
          <span className="font-black text-white tabular-nums text-sm">{gamesPlayed} games</span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md transition-all cursor-pointer active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
};
