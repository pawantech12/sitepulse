import ScanLog from "@/models/ScanLog";

export async function createLog(
  scanId,
  message,
  status = "running",
  pageUrl = "",
  type = "main",
  parent = null,
) {
  try {
    return await ScanLog.create({
      scanId,
      message,
      status,
      pageUrl,
      type,
      parent,
    });
  } catch (err) {
    console.log("Log Error:", err.message);
    return null;
  }
}
