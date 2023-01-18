import { DesktopAPI } from "../services/wallet/desktop-system.service";

declare global {
  interface Window {
    marketplace2: DesktopAPI;
  }
}
