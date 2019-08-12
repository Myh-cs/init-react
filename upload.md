## upload status.Emun

Fine Uploader provides API methods and other options to facilitate statistics and status updates on your uploads.

With this, we can register a callback that allows us to be notified when any submitted item changes status. The concept is simple: this will be invoked whenever any submitted file changes state. The ID, old status, and the new status will be included in the callback parameters.

The status values correspond to those found in the qq.status object. For reference, here are valid status values:

- `SUBMITTING` - Selected file is in the process of being submitted to the uploader. Validation checks occur during this phase.
- `SUBMITTED` - Selected file has been successfully submitted to the uploader. In UI mode, it is also now represented in the DOM.

- `QUEUED` - Uploads are in progress, but this one has not yet started due to lack of available connections. It is waiting in line for an available connection before an attempt is made to upload it.

- `UPLOADING` - File is currently uploading (in progress).
- `UPLOAD_FINALIZING` - All bytes have been sent for all chunks and we are waiting for a final response from the server (such as a response to the chunking.success request).
- `UPLOAD_RETRYING` - The state when an upload retry is about to occur, just before the auto retry waiting period starts.
- `UPLOAD_FAILED` - The upload has officially failed to upload, after all auto-retry attempts have been exhausted.
- `UPLOAD_SUCCESSFUL` - The upload has officially succeeded.

- `CANCELED` - The upload has been canceled.
- `REJECTED` - The submitted file has failed validation, either via the internal validation checks, or via a validate, validateBatch, or submit event callback.

- `DELETED` - The file has been successfully deleted from the server.
- `DELETING` - A delete attempt is in progress.
- `DELETE_FAILED` - The last delete attempt failed.

- `PAUSED` - The file was in progress, but is now paused.


## Event

