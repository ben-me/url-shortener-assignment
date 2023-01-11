import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function EditDialog({
  row,
  isOpen,
  onSetDialogOpen,
  onFetchUrlData,
}) {
  async function handleSubmit(event, row) {
    event.preventDefault();
    const form = event.target;
    try {
      const response = await fetch(
        `https://urlshortener.smef.io/urls/${row.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            url: form.url.value.toString(),
            ttlInSeconds: form.ttl.value,
          }),
        }
      );
      if (response) {
        onFetchUrlData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => onSetDialogOpen(false)}>
      <DialogTitle>Eintrag bearbeiten:</DialogTitle>
      <form
        onSubmit={(event) => {
          onSetDialogOpen(false);
          handleSubmit(event, row);
        }}
      >
        <DialogContent>
          <TextField
            id="url"
            type="url"
            label="Originaler URL"
            variant="standard"
            defaultValue={row.originalUrl.props.href}
            fullWidth
          ></TextField>
          <TextField
            type="number"
            id="ttl"
            label="Lebenszeit"
            variant="standard"
            defaultValue={row.ttlInSeconds}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSetDialogOpen(false)}>Abbrechen</Button>
          <Button type="submit" autoFocus>
            Änderung speichern
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
