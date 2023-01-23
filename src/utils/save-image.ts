import FileSaver from "file-saver";

export function SaveImage({ id, photoUrl }: { id: string; photoUrl: string }) {
  FileSaver.saveAs(photoUrl, `${id}.jpg`);
}
