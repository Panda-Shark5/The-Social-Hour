const UploadImage = props => {


  
  return (
    <div class="left-div">
      <form class="make-row" method="POST" action="http://localhost:3001/api/upload" encType="multipart/form-data" id="upload-post">
        <div>
          <input type="file" name="file" required />
        </div>
        <div>
          <input type="submit" value="Upload photo" />
        </div>
      </form>
    </div>
    
  )
}

export default UploadImage;