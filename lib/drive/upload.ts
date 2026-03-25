import { google } from "googleapis";
import { Readable } from "stream";

/**
 * Service account credentials JSON'dan Drive client oluşturur.
 * GOOGLE_SERVICE_ACCOUNT_JSON env değişkeninden okur (base64 encoded).
 */
function getDriveClient() {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!base64) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env eksik");

  const credentials = JSON.parse(
    Buffer.from(base64, "base64").toString("utf-8"),
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  return google.drive({ version: "v3", auth });
}

/**
 * PDF buffer'ı Drive'a yükler, herkese açık paylaşım linki döner.
 */
export async function uploadPdfToDrive(
  pdfBuffer: Buffer,
  fileName: string,
  folderId?: string,
): Promise<{ fileId: string; webViewLink: string; downloadLink: string }> {
  const drive = getDriveClient();

  const uploadResponse = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: "application/pdf",
      parents: folderId ? [folderId] : undefined,
    },
    supportsAllDrives: true,
    media: {
      mimeType: "application/pdf",
      body: Readable.from(pdfBuffer),
    },
    fields: "id, webViewLink, webContentLink",
  });

  const fileId = uploadResponse.data.id!;

  await drive.permissions.create({
    fileId,
    supportsAllDrives: true,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const file = await drive.files.get({
    fileId,
    supportsAllDrives: true,
    fields: "webViewLink, webContentLink",
  });

  return {
    fileId,
    webViewLink: file.data.webViewLink!,
    downloadLink: file.data.webContentLink!,
  };
}
