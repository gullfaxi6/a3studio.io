import {
  ScanLine,
  Box,
  PenTool,
  Handshake,
  Building2,
  Workflow,
  Target,
  Eye,
  Ruler,
  Sparkles,
  Users,
  Clock,
  Compass,
  User,
  GitMerge,
  FileText,
  LayoutGrid,
  Layers,
  Search,
  Network,
  Cpu,
  ShieldCheck,
  Ear,
  Database,
  Mail,
  Phone,
  Linkedin,
  type LucideIcon,
} from "lucide-react";

/**
 * Registre central des icônes (line icons, trait 1.5px).
 * /content ne stocke qu'une clé sémantique, résolue ici.
 */
const registry: Record<string, LucideIcon> = {
  scan: ScanLine,
  box: Box,
  pen: PenTool,
  handshake: Handshake,
  building: Building2,
  workflow: Workflow,
  target: Target,
  eye: Eye,
  ruler: Ruler,
  sparkles: Sparkles,
  users: Users,
  clock: Clock,
  compass: Compass,
  user: User,
  gitMerge: GitMerge,
  file: FileText,
  grid: LayoutGrid,
  layers: Layers,
  search: Search,
  network: Network,
  cpu: Cpu,
  shield: ShieldCheck,
  ear: Ear,
  database: Database,
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
};

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 24, className = "" }: Props) {
  const Glyph = registry[name] ?? Box;
  return <Glyph size={size} strokeWidth={1.5} aria-hidden="true" className={className} />;
}
