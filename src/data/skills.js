import {
  Code2,
  Globe,
  Cpu,
  Database,
  GitBranch,
  Server,
  Layers,
  Terminal,
  Box,
  Figma,
} from "lucide-react";

export const allSkills = [
  {
    name: "HTML/CSS",
    percent: 70,
    icon: <Globe size={20} />,
    color: "#E34F26",
  },
  {
    name: "JS & Jquery",
    percent: 65,
    icon: <Code2 size={20} />,
    color: "#F7DF1E",
  },
  {
    name: "Next Js",
    percent: 80,
    icon: <Terminal size={20} />,
    color: "#000000",
  },
  {
    name: "MySql",
    percent: 60,
    icon: <Database size={20} />,
    color: "#4479A1",
  },
  {
    name: "Git & Bitbucket",
    percent: 60,
    icon: <GitBranch size={20} />,
    color: "#F05032",
  },
  { name: "Laravel", percent: 60, icon: <Box size={20} />, color: "#FF2D20" },
  {
    name: "React Js",
    percent: 40,
    icon: <Layers size={20} />,
    color: "#61DAFB",
  },
  {
    name: "Node & Express",
    percent: 55,
    icon: <Server size={20} />,
    color: "#339933",
  },
  { name: "Mongo Db", percent: 30, icon: <Cpu size={20} />, color: "#47A248" },
  {
    name: "Adobe Xd",
    percent: 60,
    icon: <Figma size={20} />,
    color: "#FF61F6",
  },
];
