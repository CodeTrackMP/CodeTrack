import axiosInstance from "./axiosInstance";

export const getStatsOverview = () =>
  axiosInstance.get("/api/dashboard/stats");

export const getPlatformStats = () =>
  axiosInstance.get("/api/dashboard/platforms");

export const getHeatmap = () =>
  axiosInstance.get("/api/dashboard/heatmap");

export const getTopicActivity = () =>
  axiosInstance.get("/api/dashboard/topics");