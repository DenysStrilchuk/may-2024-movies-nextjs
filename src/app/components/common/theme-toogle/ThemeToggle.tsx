"use client";

import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      color="inherit"
    >
      {theme === "light" ? <Brightness4Icon/> : <Brightness7Icon/>}
    </IconButton>
  );
}
