import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2
} from "lucide-react";
const ContactPublicView = () => {
  const { showToast, currentUser } = useChurch();
  const [name, setName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [subject, setSubject] = useState("Demande d'information g\xE9n\xE9rale");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    showToast("Message envoy\xE9 !", "Votre message a \xE9t\xE9 transmis au secr\xE9tariat pastoral. Nous vous r\xE9pondrons sous 24h.", "success");
    setIsSent(true);
  };
  return <div className="space-y-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-emerald-700" /> Écoute & Échange
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Contactez l'Église CPC
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Une question sur nos cultes, une demande d'entretien pastoral, ou un projet associatif ? Notre équipe pastorale et administrative est à votre entière disposition.
        </p>
      </div>

      {
    /* Grid */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {
    /* Left Information Cards (5 cols) */
  }
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-xl text-stone-900">
              Coordonnées Directes
            </h3>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Secrétariat Général & WhatsApp</span>
                  <strong className="text-stone-900 text-sm">+237 699 00 00 00 / 677 00 00 00</strong>
                  <p className="text-[11px] text-stone-500">Du Lundi au Samedi de 08h00 à 18h00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">E-mail Officiel</span>
                  <strong className="text-stone-900 text-sm">contact@cpcn-ngangue.org</strong>
                  <p className="text-[11px] text-stone-500">Réponse rapide de l'équipe pastorale</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Sanctuaire & Lieu de Culte</span>
                  <strong className="text-stone-900 text-sm">New Bell Ngangué (Lieu-dit Maison Blanche)</strong>
                  <p className="text-[11px] text-stone-500">Douala, Cameroun</p>
                </div>
              </div>
            </div>
          </div>

          {
    /* Pastoral Emergency Line */
  }
          <div className="p-6 rounded-3xl bg-amber-950 text-stone-100 border border-amber-800/80 space-y-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Urgence Pastorale & Visite Hôpital</span>
            <h4 className="font-display font-bold text-lg text-white">Permanence 24h/24 & 7j/7</h4>
            <p className="text-xs text-amber-200 leading-relaxed">
              Pour les situations d'urgence spirituelle, prière de délivrance, deuil ou hospitalisation :
            </p>
            <p className="text-sm font-bold text-amber-300 pt-1">
              📞 Ligne Pastorale Directe : +237 699 11 22 33
            </p>
          </div>
        </div>

        {
    /* Right Form (7 cols) */
  }
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-6">
            {!isSent ? <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display font-bold text-2xl text-stone-900">
                    Formulaire de Contact
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Remplissez ce formulaire et votre message sera directement assigné au département compétent.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Votre Nom complet *
                    </label>
                    <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Adresse e-mail *
                    </label>
                    <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Téléphone
                    </label>
                    <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Objet de votre message *
                    </label>
                    <select
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  >
                      <option value="Demande d'information générale">Information générale</option>
                      <option value="Entretien avec un pasteur">Demande d'entretien pastoral</option>
                      <option value="Inscription baptême / cours">Baptême & Formations</option>
                      <option value="Bénédiction de mariage / enfant">Mariage / Présentation d'enfant</option>
                      <option value="Partenariat ou mission">Partenariat & Mission</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Votre Message *
                  </label>
                  <textarea
    required
    rows={5}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Écrivez votre message ici..."
    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>

                <div className="pt-2">
                  <button
    type="submit"
    className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-display font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer mon message au secrétariat</span>
                  </button>
                </div>
              </form> : <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-2xl text-stone-900">
                  Message Transmis avec Succès !
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Merci {name}. Votre demande concernant « {subject} » a bien été enregistrée et sera traitée dans les plus brefs délais.
                </p>
                <div className="pt-4">
                  <button
    onClick={() => {
      setIsSent(false);
      setMessage("");
    }}
    className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
  >
                    Envoyer un autre message
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export {
  ContactPublicView
};
