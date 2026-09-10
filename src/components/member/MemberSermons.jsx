import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Video,
  Play,
  Eye,
  Share2,
  X
} from "lucide-react";
const MemberSermons = () => {
  const { sermons, showToast } = useChurch();
  const [activeSermonModal, setActiveSermonModal] = useState(null);
  const handleShare = (sermon) => {
    showToast(
      "Lien copi\xE9 \u{1F4CB}",
      `Le lien direct pour visionner \xAB ${sermon.title} \xBB a \xE9t\xE9 copi\xE9 dans votre presse-papier.`,
      "info"
    );
  };
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Video className="w-3.5 h-3.5" />
          <span>Médiathèque Spirituelle</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Prédications & Enseignements en Vidéo
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          Visionnez les cultes passés, téléchargez les résumés et grandissez dans la Parole de Dieu où que vous soyez.
        </p>
      </div>

      {
    /* Sermons Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon) => <div
    key={sermon.id}
    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:border-amber-400 transition flex flex-col justify-between"
  >
            <div>
              <div className="relative h-48 bg-stone-900 overflow-hidden group">
                <img
    src={sermon.thumbnailUrl}
    alt={sermon.title}
    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
  />
                <button
    onClick={() => setActiveSermonModal(sermon)}
    className="absolute inset-0 bg-stone-950/40 hover:bg-stone-950/20 transition flex items-center justify-center cursor-pointer"
  >
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-stone-950/80 text-white text-[10px] font-bold">
                  {sermon.duration}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>{sermon.date}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{sermon.viewsCount} vues</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-stone-900 line-clamp-2">
                  {sermon.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {sermon.summary}
                </p>

                <div className="pt-2 text-[11px] text-stone-700 border-t border-stone-100 flex flex-col gap-1">
                  <div>
                    Prédicateur : <strong>{sermon.preacher}</strong>
                  </div>
                  <div className="text-amber-800 font-semibold">
                    Passage : {sermon.scripture}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
              <button
    onClick={() => setActiveSermonModal(sermon)}
    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow transition"
  >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Regarder</span>
              </button>
              <button
    onClick={() => handleShare(sermon)}
    className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
    title="Partager la vidéo"
  >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>)}
      </div>

      {
    /* Sermon Player Modal */
  }
      {activeSermonModal && <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl max-w-4xl w-full text-white overflow-hidden shadow-2xl border border-stone-700 animate-in fade-in duration-200">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-display font-bold text-base text-white">
                  {activeSermonModal.title}
                </h3>
              </div>
              <button
    onClick={() => setActiveSermonModal(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            {
    /* Video Player Container */
  }
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
    src={activeSermonModal.thumbnailUrl}
    alt={activeSermonModal.title}
    className="w-full h-full object-cover opacity-60"
  />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gradient-to-t from-black via-transparent to-black/60">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-2xl animate-bounce">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="space-y-1 max-w-lg">
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    « {activeSermonModal.title} »
                  </h4>
                  <p className="text-xs text-stone-300">
                    Prédicateur : {activeSermonModal.preacher} • {activeSermonModal.scripture}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-stone-950 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4 text-stone-400">
                  <span>Date : {activeSermonModal.date}</span>
                  <span>•</span>
                  <span>Durée : {activeSermonModal.duration}</span>
                  <span>•</span>
                  <span>Vues : {activeSermonModal.viewsCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  {activeSermonModal.platforms.youtube && <span className="px-2.5 py-1 rounded-lg bg-red-900/60 text-red-200 text-[10px] font-bold border border-red-700">
                      YouTube Live
                    </span>}
                  {activeSermonModal.platforms.facebook && <span className="px-2.5 py-1 rounded-lg bg-blue-900/60 text-blue-200 text-[10px] font-bold border border-blue-700">
                      Facebook
                    </span>}
                  {activeSermonModal.platforms.tiktok && <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 text-[10px] font-bold border border-stone-700">
                      TikTok
                    </span>}
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed border-t border-stone-800 pt-4">
                {activeSermonModal.summary}
              </p>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  MemberSermons
};
