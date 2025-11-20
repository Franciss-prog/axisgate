'use client';

import { useState } from 'react';
import { convertNetherToOverworld, convertOverworldToNether } from '@/utils/conversion';
type Direction = 'nether-to-overworld' | 'overworld-to-nether';

export interface Coordinates {
  x: string;
  y: string;
  z: string;
}

export default function Home() {
  const [direction, setDirection] = useState<Direction>('nether-to-overworld');
  const [netherCoords, setNetherCoords] = useState<Coordinates>({ x: '', y: '', z: '' });
  const [overworldCoords, setOverworldCoords] = useState<Coordinates>({ x: '', y: '', z: '' });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});

  const handleDirectionToggle = () => {
    setDirection(prev => prev === 'nether-to-overworld' ? 'overworld-to-nether' : 'nether-to-overworld');
    setResult(null);
    setValidationErrors({});
  };

  const validateInputs = (coords: Coordinates, prefix: string): boolean => {
    const errors: { [key: string]: boolean } = {};
    let isValid = true;

    if (!coords.x.trim()) {
      errors[`${prefix}-x`] = true;
      isValid = false;
    }
    if (!coords.y.trim()) {
      errors[`${prefix}-y`] = true;
      isValid = false;
    }
    if (!coords.z.trim()) {
      errors[`${prefix}-z`] = true;
      isValid = false;
    }

    setValidationErrors(prev => ({ ...prev, ...errors }));
    return isValid;
  };

  const handleConvert = () => {
    setValidationErrors({});

    if (direction === 'nether-to-overworld') {
      if (!validateInputs(netherCoords, 'nether')) {
        return;
      }
    } else {
      if (!validateInputs(overworldCoords, 'overworld')) {
        return;
      }
    }

    setIsLoading(true);
    
    // process of conversion
    const getConversionResult = (netherCoords: Coordinates, overworldCoords: Coordinates) => {
      
      
      // 1. check the conversion direction and validate the coordinates
      if (direction === 'nether-to-overworld' && !validateInputs(netherCoords, 'nether')) {
        console.error('Invalid nether coordinates');
        return;
      }
      if (direction === 'overworld-to-nether' && !validateInputs(overworldCoords, 'overworld')) {
        console.error('Invalid overworld coordinates');
        return;
      }

      if (direction === 'nether-to-overworld') {
        // convert the nether coordinates to overworld coordinates
        const overworldCoords = convertNetherToOverworld(netherCoords);
        return `Nether (${netherCoords.x}, ${netherCoords.y}, ${netherCoords.z}) → Overworld (${overworldCoords.x}, ${overworldCoords.y}, ${overworldCoords.z})`;
      } else {
        // convert the overworld coordinates to nether coordinates
        const netherCoords = convertOverworldToNether(overworldCoords);
        return `Overworld (${overworldCoords.x}, ${overworldCoords.y}, ${overworldCoords.z}) → Nether (${netherCoords.x}, ${netherCoords.y}, ${netherCoords.z})`;
      }
    // 3. convert the coordinates
    // 4. return the result
    };
    
    
    // Simulate processing delay with Minecraft-styled loading
    setTimeout(() => {
      if (direction === 'nether-to-overworld') {
        setResult(`${getConversionResult(netherCoords, overworldCoords)}`);
      } else {
        setResult(`${getConversionResult(overworldCoords, netherCoords)}`);
      }
      setIsLoading(false);
    }, 800);
  };

  const updateNetherCoords = (field: keyof Coordinates, value: string) => {
    setNetherCoords(prev => ({ ...prev, [field]: value }));
    if (validationErrors[`nether-${field}`]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`nether-${field}`];
        return newErrors;
      });
    }
  };

  const updateOverworldCoords = (field: keyof Coordinates, value: string) => {
    setOverworldCoords(prev => ({ ...prev, [field]: value }));
    if (validationErrors[`overworld-${field}`]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`overworld-${field}`];
        return newErrors;
      });
    }
  };

  const isNetherActive = direction === 'nether-to-overworld';
  const isOverworldActive = direction === 'overworld-to-nether';

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-600 via-sky-500 to-sky-400 flex flex-col">
      {/* Header - Minecraft Signage Style */}
      <header className="w-full py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="minecraft-sign bg-[#8B4513] border-4 border-[#654321] shadow-[inset_0_2px_0_#a0522d,inset_0_-2px_0_#5a2f0f] p-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] uppercase pixel-font">
                ⚡ AXIS GATE ⚡
              </h1>
              <p className="text-yellow-200 text-sm md:text-base mt-2 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
                Nether ↔ Overworld Coordinate Converter
              </p>
            </div>
            {/* Sign posts */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-16 bg-[#654321] border-2 border-[#4a2810] shadow-[inset_2px_0_0_#8B4513]"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-16 bg-[#654321] border-2 border-[#4a2810] shadow-[inset_-2px_0_0_#8B4513]"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-8 max-w-4xl w-full mx-auto">
        <div className="minecraft-panel bg-[#8B8B8B] border-4 border-[#666666] shadow-[inset_0_2px_0_#a0a0a0,inset_0_-2px_0_#555555,0_8px_0_rgba(0,0,0,0.3)] p-6 md:p-8">
          {/* Direction Toggle */}
          <div className="mb-8">
            <label className="block text-white text-sm font-bold mb-3 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] uppercase tracking-wide">
              Conversion Direction
            </label>
            <div className="flex items-center gap-4 justify-center">
              <span className={`text-lg font-bold transition-all ${isNetherActive ? 'text-white' : 'text-gray-400'}`}>
                Nether
              </span>
              <button
                onClick={handleDirectionToggle}
                className="relative w-20 h-10 bg-[#6B6B6B] border-4 border-[#4A4A4A] shadow-[inset_0_2px_0_#8B8B8B,inset_0_-2px_0_#3A3A3A,0_4px_0_rgba(0,0,0,0.3)] hover:shadow-[inset_0_2px_0_#8B8B8B,inset_0_-2px_0_#3A3A3A,0_2px_0_rgba(0,0,0,0.3)] active:shadow-[inset_0_1px_0_#8B8B8B,inset_0_-1px_0_#3A3A3A] transition-all duration-150 rounded"
              >
                <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-[#888888] border-2 border-[#666666] shadow-[inset_0_1px_0_#aaa,inset_0_-1px_0_#555] transition-all duration-300 rounded ${isOverworldActive ? 'translate-x-12' : 'translate-x-2'}`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                    {isNetherActive ? '→' : '←'}
                  </div>
                </div>
              </button>
              <span className={`text-lg font-bold transition-all ${isOverworldActive ? 'text-white' : 'text-gray-400'}`}>
                Overworld
              </span>
            </div>
          </div>

          {/* Coordinate Input Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Nether Coordinates */}
            <div className={`minecraft-block bg-[#6B4226] border-4 border-[#4A2F1A] shadow-[inset_0_2px_0_#8B5A3A,inset_0_-2px_0_#3A1F0F,0_4px_0_rgba(0,0,0,0.3)] p-6 transition-all ${isNetherActive ? 'ring-4 ring-yellow-400/50 shadow-[inset_0_2px_0_#8B5A3A,inset_0_-2px_0_#3A1F0F,0_8px_0_rgba(0,0,0,0.3)]' : 'opacity-60'}`}>
              <h2 className="text-xl font-bold text-white mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] uppercase tracking-wide flex items-center gap-2">
                <span className="text-2xl">🔥</span> Nether Coordinates
              </h2>
              <div className="space-y-4">
                {(['x', 'y', 'z'] as const).map((axis) => (
                  <div key={axis}>
                    <label className="block text-white text-sm font-bold mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] uppercase">
                      {axis.toUpperCase()}
                    </label>
                    <input
                      type="number"
                      value={netherCoords[axis]}
                      onChange={(e) => updateNetherCoords(axis, e.target.value)}
                      disabled={!isNetherActive}
                      className={`w-full px-4 py-3 bg-[#8B5A3A] border-4 border-[#6B4226] text-white font-mono text-lg shadow-[inset_0_2px_0_#A06A4A,inset_0_-2px_0_#5A321A] focus:outline-none focus:ring-4 focus:ring-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${validationErrors[`nether-${axis}`] ? 'ring-4 ring-red-500 border-red-600' : ''}`}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Overworld Coordinates */}
            <div className={`minecraft-block bg-[#7CB342] border-4 border-[#5D8A30] shadow-[inset_0_2px_0_#8FC44F,inset_0_-2px_0_#4A6D26,0_4px_0_rgba(0,0,0,0.3)] p-6 transition-all ${isOverworldActive ? 'ring-4 ring-yellow-400/50 shadow-[inset_0_2px_0_#8FC44F,inset_0_-2px_0_#4A6D26,0_8px_0_rgba(0,0,0,0.3)]' : 'opacity-60'}`}>
              <h2 className="text-xl font-bold text-white mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] uppercase tracking-wide flex items-center gap-2">
                <span className="text-2xl">🌍</span> Overworld Coordinates
              </h2>
              <div className="space-y-4">
                {(['x', 'y', 'z'] as const).map((axis) => (
                  <div key={axis}>
                    <label className="block text-white text-sm font-bold mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] uppercase">
                      {axis.toUpperCase()}
                    </label>
                    <input
                      type="number"
                      value={overworldCoords[axis]}
                      onChange={(e) => updateOverworldCoords(axis, e.target.value)}
                      disabled={!isOverworldActive}
                      className={`w-full px-4 py-3 bg-[#8FC44F] border-4 border-[#7CB342] text-white font-mono text-lg shadow-[inset_0_2px_0_#A0D455,inset_0_-2px_0_#6B9A3A] focus:outline-none focus:ring-4 focus:ring-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${validationErrors[`overworld-${axis}`] ? 'ring-4 ring-red-500 border-red-600' : ''}`}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className={`relative px-8 py-4 bg-[#55AA55] border-4 border-[#3A7A3A] text-white font-bold text-xl uppercase tracking-wide shadow-[inset_0_2px_0_#6ABB6A,inset_0_-2px_0_#2A5A2A,0_6px_0_rgba(0,0,0,0.4)] hover:shadow-[inset_0_2px_0_#6ABB6A,inset_0_-2px_0_#2A5A2A,0_4px_0_rgba(0,0,0,0.4)] active:shadow-[inset_0_1px_0_#6ABB6A,inset_0_-1px_0_#2A5A2A,0_2px_0_rgba(0,0,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-150 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] min-w-[200px] ${isLoading ? 'animate-pulse' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                '⚡ Convert ⚡'
              )}
            </button>
          </div>

          {/* Result Panel */}
          {(result || isLoading) && (
            <div className="minecraft-info-box bg-[#C4A484] border-4 border-[#8B6B4A] shadow-[inset_0_2px_0_#D4B494,inset_0_-2px_0_#6B4B2A,0_6px_0_rgba(0,0,0,0.3)] p-6">
              <h3 className="text-xl font-bold text-[#4A2F1A] mb-4 drop-shadow-[1px_1px_0_rgba(255,255,255,0.5)] uppercase tracking-wide">
                📊 Conversion Result
              </h3>
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-6 bg-[#D4B494] border-2 border-[#B49474] animate-pulse"></div>
                  <div className="h-6 bg-[#D4B494] border-2 border-[#B49474] animate-pulse w-3/4"></div>
                  <div className="flex gap-2 mt-4">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-[#8B6B4A] border-2 border-[#6B4B2A] animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#E4D4B4] border-4 border-[#C4A484] shadow-[inset_0_2px_0_#F4E4C4,inset_0_-2px_0_#A48464] p-4">
                  <p className="text-[#4A2F1A] font-mono text-lg font-bold break-words">
                    {result}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 mt-auto">
        <div className="max-w-4xl mx-auto">
          <div className="minecraft-block bg-[#8B4513] border-4 border-[#654321] shadow-[inset_0_2px_0_#a0522d,inset_0_-2px_0_#5a2f0f] p-4 text-center">
            <p className="text-white text-sm drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
              Made with <span className="text-red-400">❤</span> for Minecraft Players | 
              <span className="text-yellow-200"> AxisGate v1.0</span>
            </p>
            <p className="text-yellow-200 text-xs mt-2 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
              Note: This is a placeholder tool. Conversion logic not implemented.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
