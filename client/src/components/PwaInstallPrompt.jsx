import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function PwaInstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [installed, setInstalled] = useState(
    window.matchMedia?.('(display-mode: standalone)').matches || false,
  );

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallEvent(event);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;

    installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  if (!installEvent || installed) {
    return null;
  }

  return (
    <button className="pwa-install-btn" type="button" onClick={handleInstall}>
      <FaDownload />
      Install app
    </button>
  );
}
