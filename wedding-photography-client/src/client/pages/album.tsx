import React, { useState } from 'react';
import ImageList from '../components/imageList/imagelist';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import './album.css';
import img4 from '../assets/img/album1.jpg';
import img5 from '../assets/img/wed10.jpg';
import img6 from '../assets/img/wed9.jpg';

function Album() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const tabData = [
    {
      index: 1,
      img: img4,
      title: 'BEL & RAM',
      subtitle: 'WEDDING SHOOT',
      images: [
        {
          img: img4,
          hideTitle: true,
        },
        {
          img: img6,
          hideTitle: true,
        },
      ],
    },
    {
      index: 2,
      img: img5,
      title: 'KIM & RITCHIE',
      subtitle: 'PRE WEDDING SHOOT',
      images: [
        {
          img: img6,
          hideTitle: true,
        },
        {
          img: img4,
          hideTitle: true,
        },
      ],
    },
    {
      index: 3,
      img: img6,
      title: 'PETER & ALISON',
      subtitle: 'WEDDING SHOOT',
      images: [
        {
          img: img6,
          hideTitle: true,
        },
        {
          img: img4,
          hideTitle: true,
        },
      ],
    },
  ];

  const handleClick = (index: number) => {
    setSelectedImage(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(0);
  };

  return (
    <div id='album'>
      <div className='text-wrapper'>
        <span className='album-heading'>Featured Albums</span>
        <br />
        <br />
        <span className='album-para'>
          Throughout the years, we have had the opportunity to photograph many
          wonderful couples at weddings of all sizes and styles, from intimate
          elopements to grand destination weddings
        </span>
      </div>
      <div className='image-wrapper'>
        <ImageList data={tabData} handleImageClick={handleClick} />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ width: '80%', maxHeight: '100vh', display: 'contents' }}>
          {selectedImage !== null && (

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

              {tabData[selectedImage - 1]?.images?.map((item, index) => (

                <div key={index} style={{ width: '90%', height: 'auto', margin: '5px' }}>

                  <img src={item.img} alt={`Image ${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default Album;
