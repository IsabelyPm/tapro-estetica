import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, CloudRain, AlertTriangle, MessageCircle, Star, ArrowRight, ShieldAlert, X, Send, User, Car, MessageSquare, Calendar, Clock, Gift, CheckCircle2, Loader2 } from "lucide-react";

import logoImg from "../assets/logo.png";
import heroCar from "../assets/hero-car.jpg";
import beforeImg from "../assets/before.jpg";
import afterImg from "../assets/after.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const COMPANY_PHONE = "5511999999999"; 
const BONUS_TEXT = "Cristalização de Vidros Grátis";

const pains = [
  { icon: ShieldAlert, title: "Ação de fezes de pássaros e seiva", desc: "Agentes ácidos que perfuram o verniz original em menos de 24h, deixando manchas permanentes que exigem repintura." },
  { icon: AlertTriangle, title: "Raios UV e queima de verniz", desc: "A exposição diária ao sol oxida a pintura, fazendo o carro perder o brilho, desbotar e parecer envelhecido." },
  { icon: ShieldAlert, title: "Micro-riscos em lavagens comuns", desc: "Esfregar poeira acumulada cria aquela teia de aranha na pintura que destrói o reflexo e desvaloriza o patrimônio." },
];

const benefits = [
  { icon: Sparkles, title: "Efeito Espelho Permanente", desc: "Aumento real do índice de refração da luz. O carro fica com aspecto de verniz molhado e brilho de salão de exposição." },
  { icon: CloudRain, title: "Efeito Hidrofóbico Extremo", desc: "A água e a sujeira não grudam na lataria. A lavagem se torna até 3x mais rápida e evita novos riscos de fricção." },
  { icon: ShieldCheck, title: "Barreira Cerâmica 9H", desc: "Uma película invisível de alta resistência química que blinda o verniz contra intempéries e mantém o carro protegido por até 3 anos." },
];

interface CTAButtonProps {
  children: React.ReactNode;
  large?: boolean;
  onClick: () => void;
  hasBonus?: boolean;
}

function CTAButton({ children, large, onClick, hasBonus }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 font-extrabold text-neutral-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.7)] ${
        large ? "px-12 py-5 text-base md:text-xl tracking-wide" : "px-8 py-3.5 text-sm md:text-base"
      }`}
    >
      {hasBonus && (
        <span className="absolute -top-4.5 -right-3 rotate-6 bg-red-600 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md font-black animate-bounce shadow-[0_4px_12px_rgba(220,38,38,0.5)] border border-red-500/30">
          🎁 BÔNUS GRÁTIS HOJE
        </span>
      )}
      <MessageCircle className="fill-neutral-950 h-5 w-5 md:h-6 md:w-6 shrink-0" />
      <span>{children}</span>
      <ArrowRight className="transition-transform group-hover:translate-x-1.5 h-5 w-5 md:h-6 md:w-6 shrink-0" />
    </button>
  );
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSlot: (date: string, time: string) => void;
}

function ScheduleModal({ isOpen, onClose, onSelectSlot }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState("Amanhã");
  const [selectedTime, setSelectedTime] = useState("09:00");

  if (!isOpen) return null;

  const dates = [
    { id: "Amanhã", label: "Amanhã", sub: "Disponível" },
    { id: "Próxima Segunda", label: "Segunda", sub: "Vagas restantes" },
    { id: "Próxima Terça", label: "Terça", sub: "Disponível" },
  ];

  const times = ["08:30", "10:00", "13:30", "15:00", "16:30"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectSlot(selectedDate, selectedTime);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors">
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-border/50 pb-4">
          <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
          <div>
            <h3 className="font-bold text-sm tracking-tight text-neutral-200 ml-1">Agenda Próximos Dias</h3>
            <p className="text-xs text-muted-foreground ml-1">Consulte a disponibilidade da oficina</p>
          </div>
        </div>

        <div className="bg-neutral-900/60 border border-border/60 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-semibold text-neutral-300 flex items-center gap-2 uppercase tracking-wider">
            <Clock size={14} className="text-amber-500" /> Horário de Atendimento
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="flex justify-between"><span>Segunda a Sexta:</span> <span className="text-neutral-300 font-medium">08h às 18h</span></p>
            <p className="flex justify-between"><span>Sábados:</span> <span className="text-neutral-300 font-medium">08h às 12h</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Selecione o Dia Preferencial</label>
            <div className="grid grid-cols-3 gap-2">
              {dates.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDate(d.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedDate === d.id 
                      ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold shadow-sm" 
                      : "border-border bg-neutral-900/40 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <span className="block text-xs text-neutral-200">{d.label}</span>
                  <span className="text-[10px] opacity-75 font-light block mt-0.5">{d.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Horários Disponíveis Estimados</label>
            <div className="grid grid-cols-4 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-1 text-center text-xs rounded-lg border transition-all ${
                    selectedTime === t 
                      ? "bg-amber-500 text-neutral-950 font-bold border-amber-500 shadow-sm" 
                      : "bg-neutral-900/40 border-border text-neutral-300 hover:border-neutral-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-neutral-950 font-extrabold py-3 px-4 rounded-xl shadow-lg text-sm hover:bg-amber-400 transition-colors">
            Avançar para Dados de Contato <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedSlot: { date: string; time: string } | null;
  isBonusActive: boolean;
}

function LeadModal({ isOpen, onClose, preSelectedSlot, isBonusActive }: LeadModalProps) {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    veiculo: "",
    desejo: "Vitrificação Premium (Blindagem de Pintura)",
  });

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Ativa a tela de muito obrigado interna
      setShowThankYou(true);

      const agendaStr = preSelectedSlot 
        ? `\n*Preferência de Agenda:* ${preSelectedSlot.date} às ${preSelectedSlot.time}`
        : "";
        
      // TEXTO DO WHATSAPP OTIMIZADO COM O INDICATIVO DINÂMICO SE GANHOU O BÔNUS OU NÃO
      const bonusStr = isBonusActive 
        ? `\n*BÔNUS ATIVADO:* ✨ ${BONUS_TEXT} Garantida! (Enviado dentro do prazo regulamentar)` 
        : `\n*Bônus:* Cronômetro expirado (Sujeito a análise técnica de pátio)`;

      const message = `Olá! Gostaria de um orçamento técnico.${agendaStr}${bonusStr}\n\n*Nome:* ${formData.nome}\n*Veículo/Modelo:* ${formData.veiculo}\n*Serviço de Interesse:* ${formData.desejo}`;
      const encodedMessage = encodeURIComponent(message);
      
      // Delay estratégico para o cliente ler o agradecimento no site antes do redirecionamento externo
      setTimeout(() => {
        window.open(`https://wa.me/${COMPANY_PHONE}?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
        setStep(1);
        setShowThankYou(false);
        setFormData({ nome: "", veiculo: "", desejo: "Vitrificação Premium (Blindagem de Pintura)" });
        onClose();
      }, 2500);
    }
  };

  const handleCloseAll = () => {
    setStep(1);
    setShowThankYou(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-6">
        
        {!showThankYou && (
          <button onClick={handleCloseAll} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors">
            <X size={18} />
          </button>
        )}

        {showThankYou ? (
          /* TELA DE MUITO OBRIGADO INTERNA PROFISSIONAL */
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="h-16 w-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <CheckCircle2 size={36} className="animate-scale-up" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight text-white">Muito Obrigado!</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Seus dados foram processados com sucesso pelo nosso sistema.
              </p>
            </div>
            {isBonusActive && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs font-bold tracking-wide">
                <Gift size={12} /> {BONUS_TEXT} Reservada!
              </div>
            )}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-amber-500 font-medium">
              <Loader2 size={14} className="animate-spin" /> Conectando com o WhatsApp do consultor...
            </div>
          </div>
        ) : (
          /* FORMULÁRIO DE ETAPAS */
          <>
            <div className="flex items-center gap-3 border-b border-border/50 pb-4">
              <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
              <div>
                <h3 className="font-bold text-sm tracking-tight text-neutral-200 ml-1">Solicitar Orçamento</h3>
                <p className="text-xs text-muted-foreground ml-1">Preencha rapidamente para direcionamento</p>
              </div>
            </div>

            {isBonusActive && (
              <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl p-3.5 flex items-start gap-3 text-xs shadow-[inset_0_1px_20px_rgba(245,158,11,0.05)]">
                <Gift size={18} className="shrink-0 mt-0.5 text-amber-500 animate-bounce" />
                <div>
                  <span className="font-extrabold text-sm block tracking-wide text-amber-400">🎁 BÔNUS DE AGENDAMENTO ATIVO</span>
                  <p className="opacity-95 font-light mt-0.5">Conclua o formulário para garantir a <strong className="font-bold text-white">{BONUS_TEXT}</strong> totalmente de graça.</p>
                </div>
              </div>
            )}

            {preSelectedSlot && (
              <div className="text-[11px] bg-amber-500/5 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                <Calendar size={12} /> Horário reservado provisoriamente: {preSelectedSlot.date} às {preSelectedSlot.time}
              </div>
            )}

            <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            <form onSubmit={handleNextStep} className="space-y-5">
              {step === 1 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wide text-muted-foreground flex items-center gap-1.5"><User size={14} /> Como podemos te chamar?</label>
                  <input required autoFocus type="text" placeholder="Seu nome completo" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full bg-neutral-900 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-neutral-200" />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wide text-muted-foreground flex items-center gap-1.5"><Car size={14} /> Qual o veículo e modelo?</label>
                  <input required autoFocus type="text" placeholder="Ex: BMW M340i 2024 Preto" value={formData.veiculo} onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })} className="w-full bg-neutral-900 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-neutral-200" />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium tracking-wide text-muted-foreground flex items-center gap-1.5"><MessageSquare size={14} /> Qual o serviço de interesse?</label>
                  <select value={formData.desejo} onChange={(e) => setFormData({ ...formData, desejo: e.target.value })} className="w-full bg-neutral-900 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-neutral-200">
                    <option>Vitrificação Premium (Blindagem de Pintura)</option>
                    <option>Correção de Verniz (Polimento Técnico)</option>
                    <option>Tratamento de Couro e Interna</option>
                    <option>Proteção Completa (Pintura + Vidros + Rodas)</option>
                  </select>
                </div>
              )}

              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 text-neutral-950 font-black py-3.5 px-4 rounded-xl shadow-lg text-sm hover:bg-amber-400 transition-colors">
                {step === 3 ? <><Send size={16} /> Enviar para o WhatsApp</> : <>Avançar <ArrowRight size={16} /></>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  const [timeLeft, setTimeLeft] = useState(600);
  const [isBonusActive, setIsBonusActive] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsBonusActive(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleScheduleComplete = (date: string, time: string) => {
    setSelectedSlot({ date, time });
    setIsScheduleOpen(false);
    setIsLeadOpen(true);
  };

  const handleDirectCTA = () => {
    setSelectedSlot(null);
    setIsLeadOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-amber-500/30 selection:text-amber-500 relative">
      
      {/* BARRA DE TOPO DE ALTO IMPACTO */}
      {isBonusActive && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white font-black text-[11px] sm:text-xs py-2.5 px-4 flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(220,38,38,0.3)] border-b border-orange-400/20">
          <Gift size={14} className="animate-spin text-white" style={{ animationDuration: '3s' }} />
          <span className="tracking-wide text-center">
            OFERTA CONDICIONAL: Conclua em <span className="font-mono bg-black/50 border border-white/20 text-amber-400 px-2 py-0.5 rounded text-[13px] ml-0.5 mr-0.5 shadow-inner font-black">{formatTime(timeLeft)}</span> e GANHE a <span className="text-amber-300 underline uppercase tracking-wider font-black">{BONUS_TEXT}</span>!
          </span>
        </div>
      )}

      {/* HEADER RESTAURADO COM TEXTO ORIGINAL + LOGO AMPLIADA */}
      <header className={`fixed ${isBonusActive ? "top-[42px]" : "top-0"} left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 transition-all duration-300`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo TAPRÓ" className="h-12 w-auto object-contain" />
            <span className="font-black tracking-tight text-lg uppercase hidden sm:inline-block">TAPRÓ<span className="text-amber-500"> ESTÉTICA</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 border border-border px-5 py-2.5 text-sm font-bold text-neutral-200 hover:text-white hover:border-neutral-700 transition-colors shadow-sm"
            >
              <Calendar className="h-4 w-4 text-amber-500" /> Consultar Agenda
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className={`relative overflow-hidden ${isBonusActive ? "pt-44 md:pt-52" : "pt-36 md:pt-44"} pb-16 md:pb-24 transition-all duration-300`}>
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
              <Sparkles size={12} /> Alta Proteção Automotiva
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Seu carro com brilho de zero km e <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">blindado</span> contra ações do tempo
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              A vitrificação automotiva cria uma barreira invisível de alta resistência química que blinda a pintura contra raios UV, fezes de pássaros e riscos de lavagem. Proteja seu patrimônio e garanta valorização máxima na revenda.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <CTAButton large onClick={handleDirectCTA} hasBonus={isBonusActive}>
                ORÇAMENTO GRATUITO
              </CTAButton>
              <div className="flex flex-col items-center sm:items-start gap-1 text-xs text-muted-foreground">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="font-semibold tracking-wide">Processo técnico certificado</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/10 via-transparent to-amber-500/20 blur-3xl rounded-full" />
            
            {/* Imagem Principal do Carro */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-neutral-900 aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
              <img src={heroCar} alt="Reflexo espelhado em pintura automotiva premium" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Emolduramento Circular da Logo */}
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 z-20 h-28 w-28 md:h-36 md:w-36 rounded-full bg-neutral-950/90 border-2 border-amber-500/80 p-3 shadow-[0_0_25px_rgba(245,158,11,0.5)] backdrop-blur-md flex items-center justify-center animate-pulse">
              <div className="absolute inset-1 rounded-full border border-dashed border-amber-500/30 animate-spin" style={{ animationDuration: '20s' }} />
              <img src={logoImg} alt="Selo de Qualidade TAPRÓ" className="h-auto w-4/5 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* PAINS SECTION */}
      <section className="py-16 md:py-24 border-t border-border/30 bg-card/20 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">O perigo invisível diário</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">O que está destruindo a pintura e o valor do seu veículo?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pains.map((p, i) => {
              const IconComponent = p.icon;
              return (
                <div key={i} className="bg-neutral-900/40 border border-red-950/25 p-8 rounded-2xl space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-200">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS REALS */}
      <section className="py-20 md:py-28 border-t border-border/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-500">A Solução Definitiva</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">A blindagem líquida com nanotecnologia cerâmica</h2>
            <p className="text-muted-foreground text-base font-light">Muito superior às ceras tradicionais do mercado. Uma barreira física real que sela os poros do verniz original.</p>
          </div>
          
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const IconComponent = b.icon;
              return (
                <div key={i} className="group relative rounded-2xl border border-border bg-card/60 p-8 transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 shadow-sm">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:from-amber-500/30 transition-colors">
                    <IconComponent className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-neutral-200">{b.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20 md:py-28 border-t border-border/30 bg-card/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Prova Técnica Visual</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">O resultado é imediato e indiscutível</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { img: beforeImg, label: "Antes do Tratamento", desc: "Superfície totalmente desprotegida, áspera, com acúmulo severo de oxidação e marcas que bloqueiam a refração natural da luz." },
              { img: afterImg, label: "Após aplicação TAPRÓ", desc: "Poros selados com vidro líquido. Tensão superficial hidrofóbica extrema, nitidez de reflexo cristalina e película protetora ativa.", highlight: true },
            ].map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-border bg-neutral-900/60 shadow-lg">
                <div className="h-64 md:h-80 overflow-hidden relative">
                  <img src={item.img} alt={item.label} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-3 relative">
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase ${item.highlight ? "bg-amber-500 text-neutral-950 font-black" : "bg-red-950/60 text-red-400 border border-red-900/30"}`}>{item.label}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 border-t border-border/30 relative overflow-hidden bg-gradient-to-b from-transparent to-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 text-center space-y-6">
          <Sparkles className="h-10 w-10 text-amber-500 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Não espere o desgaste do verniz se tornar irreversível.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            A vitrificação protege profundamente a lataria do veículo. Nossa infraestrutura conta com equipamentos de ponta e processos rigorosos para garantir o padrão máximo de excelência na entrega do seu veículo protegido.
          </p>
          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <CTAButton large onClick={handleDirectCTA} hasBonus={isBonusActive}>
              SOLICITAR AVALIAÇÃO + GARANTIR BÔNUS
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/30 py-12 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo TAPRÓ" className="h-7 w-auto object-contain brightness-90 grayscale opacity-80" />
            <span className="ml-1">© {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        onClick={handleDirectCTA}
        aria-label="Fale Conosco via WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-xl bg-green-600 text-white shadow-[0_10px_30px_rgba(22,163,74,0.4)] flex items-center justify-center hover:scale-105 hover:bg-green-500 transition-all group"
      >
        <MessageCircle className="h-6 w-6 fill-white" />
        <span className="absolute right-16 bg-card border border-border text-foreground text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Fale Conosco</span>
      </button>

      <ScheduleModal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
        onSelectSlot={handleScheduleComplete} 
      />

      <LeadModal 
        isOpen={isLeadOpen} 
        onClose={() => setIsLeadOpen(false)} 
        preSelectedSlot={selectedSlot}
        isBonusActive={isBonusActive}
      />
    </main>
  );
}