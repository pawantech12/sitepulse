// lib/updateLog.js

import ScanLog from "@/models/ScanLog";

export async function updateLog(logId, status, message = null) {
  try {
    const update = {
      status,
    };

    if (message) {
      update.message = message;
    }

    await ScanLog.findByIdAndUpdate(logId, update);
  } catch (err) {
    console.log(err);
  }
}
