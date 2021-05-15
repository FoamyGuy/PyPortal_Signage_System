import {observer} from 'mobx-react-lite';
import {InputGroup} from "@blueprintjs/core";
import {getImageSize} from "polotno/utils/image";
import {ImagesGrid} from "polotno/side-panel/images-grid";
import {SectionTab} from "polotno/side-panel/tab-button";

// import our own icon
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";


import React from 'react'

const PhotosPanel = observer(({store}) => {
    const [images, setImages] = React.useState([]);

    async function loadImages() {
        const preloaded_images = [
            "adabot", "billie", "blinka", "cappy",
            "connie", "gus", "hans", "mho", "minerva",
            "ruby", "sparky"];

        const image_objs = [];
        for (let i = 0; i < preloaded_images.length; i++){
            //console.log(preloaded_images[i]);
            image_objs.push({url: `/static/img/adafruit_${preloaded_images[i]}_emoji.png`});
        }
        //console.log(image_objs);
        setImages(image_objs);
    }

    React.useEffect(() => {
        loadImages();
    }, []);

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <InputGroup
                leftIcon="search"
                placeholder="Search..."
                onChange={(e) => {
                    loadImages();
                }}
                style={{
                    marginBottom: '20px',
                }}
            />
            <p>Demo images: </p>
            {/* you can create yur own custom component here */}
            {/* but we will use built-in grid component */}
            <ImagesGrid
                images={images}
                getPreview={(image) => image.url}
                onSelect={async (image, pos) => {
                    const {width, height} = await getImageSize(image.url);
                    store.activePage.addElement({
                        type: 'image',
                        src: image.url,
                        width,
                        height,
                        x: pos?.x || 0,
                        y: pos?.y || 0,
                    });
                }}
                rowsNumber={2}
                isLoading={!images.length}
                loadMore={false}
            />
        </div>
    );
});
export default PhotosPanel