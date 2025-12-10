import React, { useState, useEffect, useRef } from 'react';
import { Activity, FileText, Cpu, Github, Radio, Terminal, ExternalLink, ArrowRight } from 'lucide-react';

// --- 数据配置 ---
const DATA = {
  name: "ALEX CHEN",
  chineseName: "陈 艾",
  title: "RESEARCH_UNIT: DEEP CONTROL",
  bio: "Investigating the boundaries between discrete pixels and continuous control. I build agents that understand the physics of the world.",
  news: [
    { date: "2025.12", text: "Paper accepted to ICRA 2026", type: "CONF" },
    { date: "2025.10", text: "Sim2Real Gap Closed on Unitree-Go1", type: "EXP" },
    { date: "2025.08", text: "Released 'Pixel-Joystick' Dataset", type: "DATA" }
  ],
  papers: [
    {
      id: "P-01",
      title: "Haptic-Net: Feeling the Terrain via Latent Dynamics",
      venue: "CVPR 2025 (Oral)",
      desc: "A transformer-based model interpreting joystick feedback sequences to predict terrain properties before contact.",
      tags: ["Tactile", "Transformer", "Robotics"]
    },
    {
      id: "P-02",
      title: "Low-Bit Quantization for Embedded RL Policies",
      venue: "ICRA 2024",
      desc: "Running complex policies on microcontroller-level hardware without losing control precision.",
      tags: ["Embedded", "RL", "Edge Computing"]
    }
  ]
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // 全局鼠标监听
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 鼠标点击状态监听
  useEffect(() => {
    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    // 背景颜色调亮为 #e0e6e0
    <div className="min-h-screen bg-[#e0e6e0] text-[#1f3322] overflow-hidden relative cursor-none selection:bg-[#1f3322] selection:text-[#e0e6e0]">
      
      {/* 字体引入 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Press+Start+2P&display=swap');
        
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        .font-mono-clean { font-family: 'JetBrains Mono', monospace; }
        
        /* 点阵背景 - 稍微调淡一点以适应亮背景 */
        .dot-matrix-bg {
          background-image: radial-gradient(#aec0ae 15%, transparent 15%);
          background-size: 14px 14px;
        }

        /* 隐藏默认鼠标 */
        body { cursor: none; }
        a, button { cursor: none; }
      `}</style>

      {/* --- 自定义光标 --- */}
      <CustomCursor x={mousePos.x} y={mousePos.y} variant={cursorVariant} />

      {/* --- 背景装饰层 --- */}
      
      {/* 1. 基础点阵 */}
      <div className="fixed inset-0 dot-matrix-bg opacity-30 pointer-events-none z-0"></div>
      
      {/* 2. [回归] 巨大的 LAB 像素字 (带有视差效果) */}
      <div 
        className="fixed top-1/2 left-1/2 font-pixel text-[18vw] text-[#ccd6cc] pointer-events-none z-0 select-none opacity-60 leading-none whitespace-nowrap"
        style={{
          // 根据鼠标位置轻微移动，制造深度感
          transform: `
            translate(-50%, -50%) 
            rotate(-5deg) 
            translate(${(mousePos.x - window.innerWidth/2) * -0.03}px, ${(mousePos.y - window.innerHeight/2) * -0.03}px)
          `
        }}
      >
        LAB_01
      </div>

      {/* 3. 漂浮的像素碎片 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PixelDebris count={12} mouseX={mousePos.x} mouseY={mousePos.y} />
      </div>

      {/* 4. 聚光灯效果 (调整为更适合亮色背景的混合模式) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 mix-blend-soft-light"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.8), transparent)`
        }}
      />

      {/* --- 主要内容层 --- */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b-4 border-[#1f3322] border-double relative">
          <div>
            <div className="flex items-center gap-2 mb-3">
               <div className="w-2 h-2 bg-[#d35400] animate-pulse rounded-full"></div>
               <span className="font-mono-clean text-xs font-bold tracking-widest text-[#d35400]">SYSTEM_STATUS: ONLINE</span>
            </div>
            {/* 名字标题也有视差效果 */}
            <h1 
              className="font-pixel text-4xl md:text-5xl text-[#1f3322] mb-3 transition-transform duration-75 ease-out"
              style={{ transform: `translate(${(mousePos.x - window.innerWidth/2)/80}px, ${(mousePos.y - window.innerHeight/2)/80}px)` }}
            >
              {DATA.name}
            </h1>
            <p className="font-mono-clean text-lg font-medium text-[#4a5f4d]">
              {DATA.chineseName} // {DATA.title}
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 flex gap-4">
             <MagneticButton setCursor={setCursorVariant} label="GITHUB" icon={<Github size={18}/>} />
             <MagneticButton setCursor={setCursorVariant} label="SCHOLAR" icon={<Radio size={18}/>} />
             <MagneticButton setCursor={setCursorVariant} label="EMAIL" icon={<Terminal size={18}/>} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* 左侧栏 */}
          <div className="md:col-span-4 space-y-10">
            
            {/* 示波器卡片 (颜色相应调亮) */}
            <div className="border-2 border-[#1f3322] bg-[#dbe4db] p-1 shadow-[4px_4px_0px_#1f3322]">
               <div className="bg-[#1f3322] px-2 py-1 text-[#e0e6e0] font-pixel text-[10px] flex justify-between items-center">
                 <span>OSC_SIGNAL</span>
                 <Activity size={12} />
               </div>
               <div className="p-3">
                 <OscilloscopeAnimation />
                 <div className="mt-4 pt-4 border-t border-[#1f3322]/20">
                    <p className="font-mono-clean text-sm md:text-base font-medium leading-relaxed text-[#1f3322]">
                      {DATA.bio}
                    </p>
                 </div>
               </div>
            </div>

            {/* Logs */}
            <div className="font-mono-clean">
              <h3 className="text-sm font-bold bg-[#1f3322] text-[#e0e6e0] inline-block px-2 py-1 mb-4 font-pixel">
                UPDATE_LOG
              </h3>
              <ul className="space-y-4 relative border-l-2 border-[#1f3322]/20 pl-4 ml-2">
                {DATA.news.map((item, idx) => (
                  <li 
                    key={idx} 
                    className="relative group cursor-none"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 bg-[#1f3322] rounded-full group-hover:bg-[#d35400] transition-colors"></div>
                    <div className="text-xs font-bold text-[#5a6e5d] mb-1">{item.date} // {item.type}</div>
                    <div className="text-sm font-medium group-hover:text-[#d35400] transition-colors">
                      {item.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右侧栏：研究成果 */}
          <div className="md:col-span-8">
             <div className="flex items-center gap-3 mb-8">
                <Cpu size={24} className="text-[#1f3322]" />
                <span className="font-pixel text-lg">RESEARCH_MODULES</span>
                <div className="h-0.5 flex-grow bg-[#1f3322] opacity-20"></div>
             </div>

             <div className="space-y-8">
               {DATA.papers.map((paper, idx) => (
                 <TiltCard key={idx} setCursor={setCursorVariant}>
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-3">
                       <h3 className="font-mono-clean text-xl md:text-2xl font-bold text-[#1f3322] leading-tight group-hover:text-[#d35400] transition-colors">
                         {paper.title}
                       </h3>
                       <span className="font-pixel text-[10px] bg-[#1f3322]/10 px-2 py-1 rounded text-[#1f3322] whitespace-nowrap">
                         {paper.id}
                       </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm font-mono-clean font-bold text-[#4a5f4d]">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#1f3322]"></span>
                        {paper.venue}
                      </span>
                      {paper.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 border border-[#1f3322]/30 rounded-full text-xs hover:bg-[#1f3322] hover:text-[#e0e6e0] transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="font-mono-clean text-base text-[#333] leading-relaxed mb-6 max-w-2xl">
                      {paper.desc}
                    </p>

                    <div className="flex gap-6 font-mono-clean text-sm font-bold">
                       <ActionLink icon={<FileText size={16}/>} label="PDF_VIEW" />
                       <ActionLink icon={<Github size={16}/>} label="SOURCE_CODE" />
                       <ActionLink icon={<ExternalLink size={16}/>} label="PROJECT_PAGE" />
                    </div>
                 </TiltCard>
               ))}
             </div>
          </div>

        </div>
      </main>

      {/* 底部坐标 - 跟随鼠标 */}
      <div 
        className="fixed bottom-6 right-6 font-mono-clean text-xs font-bold text-[#1f3322] opacity-40 pointer-events-none"
      >
        X:{mousePos.x.toString().padStart(4, '0')} Y:{mousePos.y.toString().padStart(4, '0')}
      </div>
    </div>
  );
}

// --- 交互组件 ---

// 1. 3D 倾斜卡片 (背景调亮)
function TiltCard({ children, setCursor }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 限制旋转角度
    const rotateX = ((y - centerY) / centerY) * -3; 
    const rotateY = ((x - centerX) / centerX) * 3;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
    setCursor('default');
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={handleMouseLeave}
      // 背景从 #e0e8e0 调亮为 #ecf2ec
      className="relative bg-[#ecf2ec] border-l-4 border-[#1f3322] p-6 transition-transform duration-100 ease-out shadow-sm hover:shadow-md group"
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {/* 装饰性的角落 */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f3322] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f3322] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {children}
    </div>
  );
}

// 2. 磁吸按钮
function MagneticButton({ label, icon, setCursor }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (e.clientX - centerX) * 0.2;
    const y = (e.clientY - centerY) * 0.2;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setCursor('default');
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="flex items-center gap-2 px-4 py-2 bg-[#1f3322] text-[#e0e6e0] font-pixel text-[10px] hover:bg-[#d35400] transition-colors duration-200 shadow-[4px_4px_0px_rgba(0,0,0,0.1)]"
    >
      {icon} {label}
    </button>
  );
}

// 3. 自定义光标 (颜色适配)
function CustomCursor({ x, y, variant }) {
  return (
    <div 
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{ 
        left: x, 
        top: y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={`relative transition-all duration-200 ${variant === 'hover' ? 'scale-150' : 'scale-100'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-[#e0e6e0]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-8 bg-[#e0e6e0]"></div>
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          border border-[#e0e6e0] rounded-full transition-all duration-200
          ${variant === 'click' ? 'w-2 h-2 bg-[#e0e6e0]' : 'w-4 h-4 bg-transparent'}
        `}></div>
      </div>
    </div>
  );
}

function ActionLink({ icon, label }) {
  return (
    <a href="#" className="flex items-center gap-2 hover:text-[#d35400] transition-colors group">
      {icon}
      <span className="border-b border-transparent group-hover:border-[#d35400]">{label}</span>
      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </a>
  );
}

// 示波器动画
function OscilloscopeAnimation() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let time = 0;
    const draw = () => {
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = 80;
      ctx.clearRect(0, 0, width, height);
      
      // 网格颜色适配
      ctx.strokeStyle = 'rgba(31, 51, 34, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x=0; x<width; x+=15) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#1f3322';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x++) {
        const y = height/2 + Math.sin((x + time) * 0.08) * 15 + Math.sin((x - time * 1.5) * 0.03) * 8;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      time += 1.5;
      frameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);
  return <canvas ref={canvasRef} className="w-full h-[80px] opacity-80" />;
}

// 像素碎片 (颜色适配)
function PixelDebris({ count, mouseX, mouseY }) {
  const [pixels] = useState(() => Array.from({ length: count }).map(() => ({
    left: Math.random() * 100, top: Math.random() * 100, size: Math.random() * 20 + 5
  })));
  
  return pixels.map((p, i) => (
    <div key={i} className="absolute bg-[#1f3322] opacity-5 transition-transform duration-1000 ease-out"
      style={{
        left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size,
        transform: `translate(${(mouseX - window.innerWidth/2) * (i%2===0?0.02:-0.02)}px, ${(mouseY - window.innerHeight/2) * 0.02}px)`
      }} 
    />
  ));
}