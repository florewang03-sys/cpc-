import { useState, useEffect } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Heart,
  Lock,
  Flame,
  Users,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Send,
  CheckCircle2
} from "lucide-react";
const MemberPrayers = () => {
  const {
    currentUser,
    visiblePrayerRequests,
    createPrayerRequest,
    incrementPrayedCount,
    showToast
  } = useChurch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confidentiality, setConfidentiality] = useState("CONFIDENTIEL");
  const [isUrgent, setIsUrgent] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [voiceNoteState, setVoiceNoteState] = useState("idle");
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  useEffect(() => {
    let interval;
    if (voiceNoteState === "recording") {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [voiceNoteState]);
  useEffect(() => {
    let interval;
    if (voiceNoteState === "playing") {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev >= recordingSeconds) {
            setVoiceNoteState("recorded");
            return 0;
          }
          return prev + 1;
        });
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [voiceNoteState, recordingSeconds]);
  const handleStartRecording = () => {
    setVoiceNoteState("recording");
    setRecordingSeconds(0);
    setPlaybackSeconds(0);
    setHasVoiceNote(false);
  };
  const handleStopRecording = () => {
    setVoiceNoteState("recorded");
    setHasVoiceNote(true);
  };
  const handleTogglePlay = () => {
    if (voiceNoteState === "playing") {
      setVoiceNoteState("recorded");
    } else {
      setVoiceNoteState("playing");
    }
  };
  const handleDeleteVoiceNote = () => {
    setVoiceNoteState("idle");
    setRecordingSeconds(0);
    setPlaybackSeconds(0);
    setHasVoiceNote(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast("Titre requis", "Veuillez saisir un intitul\xE9 pour votre sujet de pri\xE8re.", "info");
      return;
    }
    let finalContent = content.trim();
    if (hasVoiceNote) {
      finalContent += `
[\u{1F399}\uFE0F Message vocal joint : ${formatTime(recordingSeconds)}]`;
    }
    if (!finalContent && !hasVoiceNote) {
      showToast("Contenu requis", "Veuillez r\xE9diger votre requ\xEAte ou enregistrer un message vocal.", "info");
      return;
    }
    createPrayerRequest({
      title: title.trim(),
      content: finalContent || "Requ\xEAte formul\xE9e par message vocal.",
      confidentiality,
      isUrgent
    });
    setTitle("");
    setContent("");
    setIsUrgent(false);
    handleDeleteVoiceNote();
  };
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  const filteredPrayers = visiblePrayerRequests.filter((p) => {
    if (activeFilter === "ALL") return true;
    return p.confidentiality === activeFilter;
  });
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Intercession & Accompagnement Pastoral</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Demandes de Prière & Soutien Spirituel
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          « Confessez donc vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficacité. » — Jacques 5:16
        </p>
      </div>

      {
    /* Grid: Form & List */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left Form (5 cols): New Prayer with Audio & Strict Confidentiality */
  }
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md">
            <h3 className="font-display font-bold text-lg text-stone-900 mb-1">
              Déposer une Demande de Prière
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Choisissez le niveau de confidentialité adapté à votre situation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {
    /* Title */
  }
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Intitulé du sujet *
                </label>
                <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Guérison divine pour un proche, examen..."
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-stone-900 bg-stone-50"
    required
  />
              </div>

              {
    /* Confidentiality Selector (Strict Role Access) */
  }
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Niveau de Confidentialité *
                </label>
                <div className="space-y-2">
                  {
    /* Option 1: CONFIDENTIEL */
  }
                  <label
    className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer ${confidentiality === "CONFIDENTIEL" ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20" : "bg-stone-50 border-stone-200 hover:bg-stone-100"}`}
  >
                    <input
    type="radio"
    name="confidentiality"
    value="CONFIDENTIEL"
    checked={confidentiality === "CONFIDENTIEL"}
    onChange={() => setConfidentiality("CONFIDENTIEL")}
    className="mt-0.5 text-amber-600 focus:ring-amber-500"
  />
                    <div className="space-y-0.5 text-xs">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>🔒 CONFIDENTIEL (Pasteur Principal uniquement)</span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">
                        Strictement réservé au Pasteur Principal pour secret pastoral. Invisible aux administrateurs et membres.
                      </p>
                    </div>
                  </label>

                  {
    /* Option 2: INTERCESSION */
  }
                  <label
    className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer ${confidentiality === "INTERCESSION" ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20" : "bg-stone-50 border-stone-200 hover:bg-stone-100"}`}
  >
                    <input
    type="radio"
    name="confidentiality"
    value="INTERCESSION"
    checked={confidentiality === "INTERCESSION"}
    onChange={() => setConfidentiality("INTERCESSION")}
    className="mt-0.5 text-amber-600 focus:ring-amber-500"
  />
                    <div className="space-y-0.5 text-xs">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-700" />
                        <span>🛡️ INTERCESSION (Pasteur & Groupe d'Intercession)</span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">
                        Transmis à l'équipe pastorale et aux sentinelles d'intercession pour jeûne et prières ciblées.
                      </p>
                    </div>
                  </label>

                  {
    /* Option 3: COMMUNAUTE */
  }
                  <label
    className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer ${confidentiality === "COMMUNAUTE" ? "bg-amber-50 border-amber-500 ring-2 ring-amber-500/20" : "bg-stone-50 border-stone-200 hover:bg-stone-100"}`}
  >
                    <input
    type="radio"
    name="confidentiality"
    value="COMMUNAUTE"
    checked={confidentiality === "COMMUNAUTE"}
    onChange={() => setConfidentiality("COMMUNAUTE")}
    className="mt-0.5 text-amber-600 focus:ring-amber-500"
  />
                    <div className="space-y-0.5 text-xs">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-700" />
                        <span>👥 COMMUNAUTÉ (Toute l'assemblée)</span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">
                        Partagé avec les fidèles sur l'application membre pour une communion fraternelle de prière.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {
    /* Content Textarea */
  }
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Détails de votre sujet
                </label>
                <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    rows={3}
    placeholder="Décrivez votre situation avec foi et sincérité..."
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-stone-900 bg-stone-50"
  />
              </div>

              {
    /* Voice Message Recorder Simulation */
  }
              <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Mic className="w-4 h-4" />
                    <span>Option : Ajouter un message vocal</span>
                  </span>
                  {hasVoiceNote && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                      Message prêt ✓
                    </span>}
                </div>

                {voiceNoteState === "idle" && <button
    type="button"
    onClick={handleStartRecording}
    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow"
  >
                    <Mic className="w-4 h-4" />
                    <span>Enregistrer un message vocal (Micro)</span>
                  </button>}

                {voiceNoteState === "recording" && <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-red-400 animate-pulse font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span>Enregistrement en cours...</span>
                      </div>
                      <span>{formatTime(recordingSeconds)}</span>
                    </div>

                    {
    /* Waveform simulation animation */
  }
                    <div className="flex items-center justify-center gap-1 h-6">
                      {[12, 24, 16, 28, 14, 20, 26, 18, 22, 30, 16, 24].map((h, i) => <div
    key={i}
    className="w-1 bg-red-500 rounded-full animate-pulse"
    style={{ height: `${h}px`, animationDelay: `${i * 80}ms` }}
  />)}
                    </div>

                    <button
    type="button"
    onClick={handleStopRecording}
    className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow"
  >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Arrêter l'enregistrement</span>
                    </button>
                  </div>}

                {(voiceNoteState === "recorded" || voiceNoteState === "playing") && <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-300">
                      <span>Durée : {formatTime(recordingSeconds)}</span>
                      {voiceNoteState === "playing" && <span className="text-amber-400 font-bold">
                          Lecture : {formatTime(playbackSeconds)}
                        </span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
    type="button"
    onClick={handleTogglePlay}
    className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
  >
                        {voiceNoteState === "playing" ? <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Mettre en pause</span>
                          </> : <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Écouter le message</span>
                          </>}
                      </button>

                      <button
    type="button"
    onClick={handleDeleteVoiceNote}
    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-red-400 hover:text-red-300 border border-stone-700 transition cursor-pointer"
    title="Supprimer la note vocale"
  >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>}
              </div>

              {
    /* Urgent Checkbox */
  }
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
    type="checkbox"
    checked={isUrgent}
    onChange={(e) => setIsUrgent(e.target.checked)}
    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
  />
                <span className="font-semibold text-red-700">
                  Marquer comme requête urgente (hospitalisation, épreuve critique)
                </span>
              </label>

              {
    /* Submit Button */
  }
              <button
    type="submit"
    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition hover:scale-[1.02] active:scale-98 cursor-pointer"
  >
                <Send className="w-4 h-4" />
                <span>Envoyer ma Demande de Prière</span>
              </button>
            </form>
          </div>
        </div>

        {
    /* Right Column (7 cols): List of Prayers with Filters & Amen counter */
  }
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">
                  Mur d'Intercession Communautaire
                </h3>
                <p className="text-xs text-stone-500">
                  Portez les fardeaux de vos frères et sœurs dans la prière.
                </p>
              </div>

              {
    /* Filters */
  }
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {["ALL", "INTERCESSION", "COMMUNAUTE"].map((filter) => <button
    key={filter}
    onClick={() => setActiveFilter(filter)}
    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${activeFilter === filter ? "bg-stone-900 text-amber-300 shadow" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
  >
                    {filter === "ALL" ? "Toutes" : filter === "INTERCESSION" ? "Intercession" : "Communaut\xE9"}
                  </button>)}
              </div>
            </div>

            {
    /* List */
  }
            <div className="space-y-3 pt-2">
              {filteredPrayers.map((prayer) => <div
    key={prayer.id}
    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-400 transition space-y-3"
  >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${prayer.confidentiality === "CONFIDENTIEL" ? "bg-red-100 text-red-800 border border-red-200" : prayer.confidentiality === "INTERCESSION" ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-stone-200 text-stone-800"}`}
  >
                          {prayer.confidentiality === "CONFIDENTIEL" && "\u{1F512} "}
                          {prayer.confidentiality}
                        </span>

                        {prayer.isUrgent && <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                            Urgent
                          </span>}

                        <span className="text-[11px] text-stone-500">
                          {prayer.requestorName} • {prayer.date}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-stone-900">
                        {prayer.title}
                      </h4>
                    </div>

                    <button
    onClick={() => incrementPrayedCount(prayer.id)}
    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-sm"
  >
                      <Heart className="w-3.5 h-3.5 fill-current text-amber-700" />
                      <span>{prayer.prayedCount} Amen</span>
                    </button>
                  </div>

                  <p className="text-xs text-stone-700 whitespace-pre-line leading-relaxed">
                    {prayer.content}
                  </p>

                  {prayer.testimonyNote && <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <strong>Témoignage :</strong> {prayer.testimonyNote}
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export {
  MemberPrayers
};
