const UploadImage = props => {
  return (
    <form method="POST" action="http://localhost:3001/api/upload" encType="multipart/form-data" id="upload-post">
      <div>
        <label>Upload profile picture</label>
        <input type="file" name="file" required />
      </div>
      <div>
        <input type="submit" value="Upload" />
      </div>
    </form>
  )
}

export default UploadImage;