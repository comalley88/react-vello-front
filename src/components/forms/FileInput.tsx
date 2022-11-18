import { CloseOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { setConstantValue } from "typescript";


const FileInput = ({name, control, setValue}: {name: string, control: any, setValue: any, watch: any}) => {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    if (selectedImage) {
      setImages(images => [...images, URL.createObjectURL(selectedImage)]);
      
    }
    
  }, [selectedImage]);


    return (

      <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, formState: {isDirty} }) => (
        <>
            <input value={isDirty ? setValue({name}, images): ""} accept="image/*" type="file" id="select-image" style={{ display: 'none' }} onChange={e => setSelectedImage(e.target.files[0])}/>
            <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
      Upload Image
    </Button>
  </label>
  {images && selectedImage && (
    <>
    <div>Image Preview:</div>
    {images.map((image, index) => (
      <div key={image} style={{position: "relative", display: "inline-block"}}>
        <img src={image} alt={selectedImage.name} height="150px"/>
        <Button style={{position: "absolute", top: 2, right: 2}} onClick={() => {
            const filteredImages = images.filter((image, i) => i !== index)
            setImages(filteredImages)
            onChange(images)
        } }>
        <CloseOutlined htmlColor="white" />
        </Button>
        
      </div>
      
        
      
    ))}
    
 </>
)}
  </>
      )}
    />
    
    )

  };
  export default FileInput;