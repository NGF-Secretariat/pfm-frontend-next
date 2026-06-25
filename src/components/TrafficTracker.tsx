"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import budgetService from "../service/budgetService";

export default function TrafficTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Generate visitorId if not present
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("visitorId", visitorId);
    }

    // 2. Map route pathnames to human-readable site sections
    let section = "Home";
    if (pathname.startsWith("/state-explorer")) {
      section = "State Explorer";
    } else if (pathname.startsWith("/group-explorer")) {
      section = "Group Explorer";
    } else if (pathname.startsWith("/rank-data")) {
      section = "Rank Data";
    } else if (pathname.startsWith("/blog-post")) {
      section = "Blog";
    } else if (pathname.startsWith("/contact-us")) {
      section = "Contact Us";
    } else if (pathname.startsWith("/settings")) {
      section = "Settings";
    } else if (pathname.startsWith("/upload")) {
      section = "Data Upload";
    } else if (pathname.startsWith("/budgets/actual")) {
      section = "Actual Expenditure";
    } else if (pathname.startsWith("/budgets/original")) {
      section = "Original Budget";
    } else if (pathname.startsWith("/budgets/performance-indicators")) {
      section = "Performance Indicators";
    }

    // 3. Log visit request
    const logVisit = async () => {
      try {
        await budgetService.logTraffic({
          visitorId,
          section,
          page: pathname,
        });
      } catch (err) {
        console.error("Traffic logging failed:", err);
      }
    };

    logVisit();
  }, [pathname]);

  return null;
}
