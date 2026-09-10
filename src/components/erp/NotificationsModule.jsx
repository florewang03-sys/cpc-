import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Send,
  Smartphone,
  Mail,
  CheckCircle2,
  Sparkles
} from "lucide-react";
const NotificationsModule = () => {
  const { groups, members, showToast } = useChurch();
  const [channel, setChannel] = useState("sms");
  const [recipientGroup, setRecipientGroup] = useState("all");
  const [subject, setSubject] = useState("Rappel Culte & Message du Pasteur");
  const [body, setBody] = useState("");
  const [logs, setLogs] = useState([
    {
      id: "log-1",
      channel: "SMS & WhatsApp",
      target: "Tous les membres actifs",
      count: 420,
      title: "Rappel : Veill\xE9e de Pri\xE8re ce vendredi \xE0 21h00",
      date: "Hier \xE0 14h30"
    },
    {
      id: "log-2",
      channel: "Email Newsletter",
      target: "D\xE9partement Rythmes C\xE9lestes",
      count: 24,
      title: "Planning des r\xE9p\xE9titions pour la convention",
      date: "Il y a 3 jours"
    }
  ]);
  const calculateTargetCount = () => {
    if (recipientGroup === "all") return members.length;
    return members.filter((m) => m.groupName === recipientGroup || m.groupName?.includes(recipientGroup)).length || 35;
  };
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!body) return;
    const count = calculateTargetCount();
    const channelLabel = channel === "sms" ? "SMS" : channel === "email" ? "Email" : "SMS & Email";
    setLogs([
      {
        id: `log-${Date.now()}`,
        channel: channelLabel,
        target: recipientGroup === "all" ? "Toute l'\xE9glise" : `Groupe ${recipientGroup}`,
        count,
        title: subject,
        date: "\xC0 l'instant"
      },
      ...logs
    ]);
    showToast(
      "Campagne Diffus\xE9e avec Succ\xE8s !",
      `Simulation d'envoi de ${count} ${channelLabel} effectu\xE9e avec succ\xE8s.`,
      "success"
    );
    setBody("");
  };
  return <div className="space-y-8 animate-fadeIn">
      {
    /* Header */
  }
      <div>
        <h2 className="font-display font-bold text-2xl text-stone-900">
          Centre de Diffusion & Notifications (SMS / Email)
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Communiquez instantanément avec l'ensemble des fidèles ou ciblez un département spécifique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Broadcast Composer (7 cols) */
  }
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Send className="w-5 h-5 text-emerald-800" />
            <h3 className="font-display font-bold text-lg text-stone-900">
              Composer un Message de Diffusion
            </h3>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                1. Canal d'envoi :
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
    type="button"
    onClick={() => setChannel("sms")}
    className={`p-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${channel === "sms" ? "bg-stone-900 text-white border-stone-950 shadow-sm" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>SMS Direct</span>
                </button>
                <button
    type="button"
    onClick={() => setChannel("email")}
    className={`p-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${channel === "email" ? "bg-stone-900 text-white border-stone-950 shadow-sm" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Email Pro</span>
                </button>
                <button
    type="button"
    onClick={() => setChannel("all")}
    className={`p-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${channel === "all" ? "bg-stone-900 text-white border-stone-950 shadow-sm" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Tous canaux</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                2. Destinataires cibles :
              </label>
              <select
    value={recipientGroup}
    onChange={(e) => setRecipientGroup(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  >
                <option value="all">Toute la communauté ({members.length} fidèles)</option>
                {groups.map((g) => <option key={g.id} value={g.name}>
                    Département : {g.name} ({g.membersCount} membres)
                  </option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                3. Objet / Titre :
              </label>
              <input
    type="text"
    required
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                4. Contenu du message :
              </label>
              <textarea
    required
    rows={5}
    value={body}
    onChange={(e) => setBody(e.target.value)}
    placeholder="Rédigez votre SMS ou email pastoral ici..."
    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-950">
              <span>Destinataires estimés : <strong>{calculateTargetCount()} personnes</strong></span>
              <span className="text-[11px] text-amber-700 font-bold">Quota SMS démo : Illimité</span>
            </div>

            <button
    type="submit"
    className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
  >
              <Send className="w-4 h-4" />
              <span>Diffuser le Message Immédiatement</span>
            </button>
          </form>
        </div>

        {
    /* History / Logs (5 cols) */
  }
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-display font-bold text-lg text-stone-900">
              Historique des Diffusions
            </h3>
            <span className="text-xs text-stone-400">{logs.length} envoyés</span>
          </div>

          <div className="space-y-3">
            {logs.map((log) => <div key={log.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                    {log.channel}
                  </span>
                  <span className="text-stone-400 text-[10px]">{log.date}</span>
                </div>
                <strong className="text-stone-900 block text-sm">{log.title}</strong>
                <p className="text-stone-500 text-[11px]">
                  Cible : <strong>{log.target}</strong> ({log.count} destinataires)
                </p>
                <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Remis avec succès à 100%
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export {
  NotificationsModule
};
