import { ChurchProvider, useChurch } from "./context/ChurchContext";
import { ToastContainer } from "./components/layout/ToastContainer";
import { PublicHeader } from "./components/layout/PublicHeader";
import { PublicFooter } from "./components/layout/PublicFooter";
import { HomeView } from "./components/public/HomeView";
import { AboutView } from "./components/public/AboutView";
import { VisionMissionView } from "./components/public/VisionMissionView";
import { LeadershipView } from "./components/public/LeadershipView";
import { GroupsPublicView } from "./components/public/GroupsPublicView";
import { GroupDetailView } from "./components/public/GroupDetailView";
import { ProgramsPublicView } from "./components/public/ProgramsPublicView";
import { EventsPublicView } from "./components/public/EventsPublicView";
import { SermonsPublicView } from "./components/public/SermonsPublicView";
import { TestimoniesPublicView } from "./components/public/TestimoniesPublicView";
import { ThanksgivingsPublicView } from "./components/public/ThanksgivingsPublicView";
import { DonationsPublicView } from "./components/public/DonationsPublicView";
import { LocationPublicView } from "./components/public/LocationPublicView";
import { ContactPublicView } from "./components/public/ContactPublicView";
import { LoginPage } from "./components/public/LoginPage";
import { MemberLayout } from "./components/member/MemberLayout";
import { LeaderLayout } from "./components/leader/LeaderLayout";
import { PastoralLayout } from "./components/pastoral/PastoralLayout";
import { ErpLayout } from "./components/erp/ErpLayout";
import { DashboardView } from "./components/erp/DashboardView";
import { MembersModule } from "./components/erp/MembersModule";
import { GroupsModule } from "./components/erp/GroupsModule";
import { ProgramsModule } from "./components/erp/ProgramsModule";
import { EventsModule } from "./components/erp/EventsModule";
import { AnnouncementsModule } from "./components/erp/AnnouncementsModule";
import { NotificationsModule } from "./components/erp/NotificationsModule";
import { PrayerRequestsModule } from "./components/erp/PrayerRequestsModule";
import { MediaModule } from "./components/erp/MediaModule";
import { DonationsModule } from "./components/erp/DonationsModule";
import { ReportsModule } from "./components/erp/ReportsModule";
import { SettingsModule } from "./components/erp/SettingsModule";
const AppContent = () => {
  const {
    currentSpace,
    setCurrentSpace,
    activePublicPage,
    setPublicPage,
    selectedGroupSlug,
    activeErpTab
  } = useChurch();
  const renderPublicPage = () => {
    switch (activePublicPage) {
      case "Accueil":
        return <HomeView />;
      case "\xC0 propos":
        return <AboutView />;
      case "Vision et mission":
        return <VisionMissionView />;
      case "Leadership":
        return <LeadershipView />;
      case "Groupes":
        return <GroupsPublicView />;
      case "GroupeDetail":
        return <GroupDetailView
          slug={selectedGroupSlug}
          onBack={() => setPublicPage("Groupes")}
        />;
      case "Programmes":
        return <ProgramsPublicView />;
      case "\xC9v\xE9nements":
        return <EventsPublicView />;
      case "Pr\xE9dications":
        return <SermonsPublicView />;
      case "T\xE9moignages":
        return <TestimoniesPublicView />;
      case "Actions de gr\xE2ce":
        return <ThanksgivingsPublicView />;
      case "Dons":
        return <DonationsPublicView />;
      case "Localisation":
        return <LocationPublicView />;
      case "Contact":
        return <ContactPublicView />;
      default:
        return <HomeView />;
    }
  };
  const renderErpModule = () => {
    switch (activeErpTab) {
      case "Tableau de bord":
        return <DashboardView />;
      case "Membres":
        return <MembersModule />;
      case "Groupes":
        return <GroupsModule />;
      case "Programmes":
        return <ProgramsModule />;
      case "\xC9v\xE9nements":
        return <EventsModule />;
      case "Annonces":
        return <AnnouncementsModule />;
      case "Notifications":
        return <NotificationsModule />;
      case "Demandes de pri\xE8re":
        return <PrayerRequestsModule />;
      case "M\xE9dias":
        return <MediaModule />;
      case "Dons":
        return <DonationsModule />;
      case "Rapports":
        return <ReportsModule />;
      case "Param\xE8tres":
        return <SettingsModule />;
      default:
        return <DashboardView />;
    }
  };
  return <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-300 selection:text-stone-950">
      {
    /* 1. Login & Auth Portal */
  }
      {currentSpace === "connexion" ? <LoginPage
    isAdminMode={false}
    onBackToPublic={() => setCurrentSpace("public")}
  /> : currentSpace === "admin-login" ? <LoginPage
    isAdminMode={true}
    onBackToPublic={() => setCurrentSpace("public")}
  /> : currentSpace === "member" ? (
    /* 2. Member Portal */
    <MemberLayout />
  ) : currentSpace === "leader" ? (
    /* 3. Group Leader Portal */
    <LeaderLayout />
  ) : currentSpace === "pastoral" ? (
    /* 4. Senior Pastor Portal */
    <PastoralLayout />
  ) : currentSpace === "erp" ? (
    /* 5. Central ERP / Back-Office Management */
    <ErpLayout>
          {renderErpModule()}
        </ErpLayout>
  ) : (
    /* 6. Public Showcase Website */
    <div className="flex-1 flex flex-col">
          <PublicHeader />
          <main className="flex-1">
            {renderPublicPage()}
          </main>
          <PublicFooter />
        </div>
  )}

      {
    /* Global Toast Notifications */
  }
      <ToastContainer />
    </div>;
};
function App() {
  return <ChurchProvider>
      <AppContent />
    </ChurchProvider>;
}
export {
  App as default
};
