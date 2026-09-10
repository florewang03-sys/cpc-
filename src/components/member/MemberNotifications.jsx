import { useChurch } from "../../context/ChurchContext";
import {
  Bell,
  Calendar,
  Sparkles,
  Heart,
  Users,
  ArrowRight,
  CheckCheck
} from "lucide-react";
const MemberNotifications = ({ onNavigateTab }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount
  } = useChurch();
  const handleNotificationClick = (item) => {
    markNotificationAsRead(item.id);
    if (item.targetTab) {
      onNavigateTab(item.targetTab, item.targetId);
    }
  };
  const getIcon = (type) => {
    switch (type) {
      case "program_update":
        return <Calendar className="w-5 h-5 text-amber-500" />;
      case "announcement":
        return <Bell className="w-5 h-5 text-amber-500" />;
      case "prayer_answered":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "group_request":
        return <Users className="w-5 h-5 text-emerald-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
            <Bell className="w-3.5 h-3.5" />
            <span>Centre de Notifications</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Vos Notifications & Alertes
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Restez informé en temps réel des changements d'horaires, nouvelles annonces et activités de vos groupes.
          </p>
        </div>

        {unreadNotificationsCount > 0 && <button
    onClick={markAllNotificationsAsRead}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow flex items-center gap-2 cursor-pointer shrink-0 transition"
  >
            <CheckCheck className="w-4 h-4" />
            <span>Tout marquer comme lu</span>
          </button>}
      </div>

      {
    /* Notifications List */
  }
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        {notifications.length === 0 ? <div className="text-center py-12 text-stone-400 space-y-2">
            <Bell className="w-12 h-12 mx-auto opacity-40" />
            <p className="text-sm font-semibold">Aucune notification pour le moment.</p>
          </div> : <div className="space-y-3">
            {notifications.map((item) => <div
    key={item.id}
    onClick={() => handleNotificationClick(item)}
    className={`p-4 sm:p-5 rounded-2xl border transition flex items-start justify-between gap-4 cursor-pointer ${!item.read ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/20" : "bg-stone-50 border-stone-200 hover:border-amber-300"}`}
  >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-stone-200 flex items-center justify-center shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-stone-900">
                        {item.title}
                      </h4>
                      {!item.read && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-stone-400 block pt-1">
                      {item.timeAgo} • {new Date(item.date).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                    <span>Ouvrir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>)}
          </div>}
      </div>
    </div>;
};
export {
  MemberNotifications
};
