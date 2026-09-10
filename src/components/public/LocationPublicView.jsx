import { useChurch } from "../../context/ChurchContext";
import {
  MapPin,
  Navigation,
  Share2,
  Car,
  Clock,
  ShieldCheck,
  Bike
} from "lucide-react";
const LocationPublicView = () => {
  const { showToast } = useChurch();
  const handleCopyLocation = () => {
    navigator.clipboard.writeText("Communaut\xE9 pour Christ (CPC), Quartier New Bell Ngangu\xE9, Lieu-dit Maison Blanche, Douala, Cameroun");
    showToast("Adresse copi\xE9e !", "L'adresse exacte du sanctuaire de Ngangue a \xE9t\xE9 copi\xE9e.", "info");
  };
  const handleOpenGPS = () => {
    window.open("https://maps.google.com/?q=Douala+Ngangue+Cameroun", "_blank");
  };
  return <div className="space-y-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-amber-700" /> Nous Trouver Facilement
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Localisation & Plan d'Accès
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Le sanctuaire de la Communauté pour Christ de Ngangue est idéalement situé à New Bell Ngangué (Lieu-dit Maison Blanche), facilement accessible en moto-taxi et en voiture.
        </p>
      </div>

      {
    /* Main Container */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {
    /* Left Map View (7 cols) */
  }
        <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl flex flex-col justify-between">
          <div className="relative h-80 sm:h-96 w-full bg-stone-900 overflow-hidden">
            {
    /* Styled Douala / Ngangue Map Embed */
  }
            <iframe
    title="Carte CPC Ngangue Douala"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8973646549216!2d9.7155!3d4.0275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128c792193c7%3A0xb36ef27a0542385b!2sDouala%2C%20Cameroon!5e0!3m2!1sfr!2scm!4v1650000000000!5m2!1sfr!2scm"
    className="w-full h-full border-0 filter contrast-105"
    loading="lazy"
  />
            <div className="absolute top-4 left-4 bg-stone-950/90 text-white p-3 rounded-2xl border border-stone-700 backdrop-blur-md space-y-1 shadow-lg max-w-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Sanctuaire Principal</span>
              <p className="font-display font-bold text-sm">Communauté pour Christ de Ngangue</p>
              <p className="text-[11px] text-stone-300">Quartier New Bell Ngangué (Lieu-dit Maison Blanche), Douala</p>
            </div>
          </div>

          <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
    onClick={handleOpenGPS}
    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
  >
                <Navigation className="w-4 h-4" />
                <span>Ouvrir l'itinéraire GPS</span>
              </button>
              <button
    onClick={handleCopyLocation}
    className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
  >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copier l'adresse</span>
              </button>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">Repère : Lieu-dit Maison Blanche, Ngangué</span>
          </div>
        </div>

        {
    /* Right Info Panels (5 cols) */
  }
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-2xl text-stone-900">
              Moyens de Transport
            </h3>

            <div className="space-y-4 text-xs text-stone-700">
              {
    /* Moto-taxi */
  }
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Bike className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <strong className="text-stone-900 text-sm">En Moto-taxi</strong>
                  <p className="text-stone-600 leading-relaxed">
                    Moyen de déplacement direct et très rapide. Indiquez simplement au conducteur de moto : <strong>« Ngangué, Lieu-dit Maison Blanche »</strong>. Dépose directe devant le sanctuaire.
                  </p>
                </div>
              </div>

              {
    /* En Voiture & Taxi */
  }
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
                  <Car className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <strong className="text-stone-900 text-sm">En Voiture & Taxi de Ville</strong>
                  <p className="text-stone-600 leading-relaxed">
                    Accès direct par la voie principale goudronnée de New Bell Ngangué. Espace de stationnement sécurisé et gardé par le service de protocole pendant tous les cultes.
                  </p>
                </div>
              </div>

              {
    /* Accueil & Accueil des Visiteurs */
  }
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <strong className="text-stone-900 text-sm">Accueil des Visiteurs & Nouveaux Venus</strong>
                  <p className="text-stone-600 leading-relaxed">
                    Notre équipe de protocole et d'accueil vous oriente dès votre arrivée au sanctuaire avec un accueil chaleureux et fraternel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {
    /* Accessibilité Plain-Pied : Pas d'ascenseur, pas d'escalier */
  }
          <div className="p-6 rounded-3xl bg-stone-900 text-stone-100 border border-stone-800 space-y-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accès Plain-Pied (Rez-de-chaussée Direct)</span>
            </span>
            <h4 className="font-display font-bold text-lg text-white">Sanctuaire entièrement accessible</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Le sanctuaire est situé de plain-pied (au rez-de-chaussée direct), sans marches, sans escalier ni ascenseur. L'accès est aisé, fluide et immédiat pour tous les fidèles, les aînés et les personnes à mobilité réduite.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export {
  LocationPublicView
};
