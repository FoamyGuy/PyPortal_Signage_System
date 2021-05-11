import { observer } from 'mobx-react-lite';
import {SectionTab} from 'polotno/side-panel/tab-button';
import {Button} from '@blueprintjs/core';
import { GiResize } from "react-icons/gi";

const AVAILABLE_SIZES = [
  { width: 1920, height: 1080 },
  { width: 1080, height: 1920 },
  { width: 3840, height: 1080 },
  { width: 5760, height: 1080 },
  { width: 3840, height: 2160 },


];

// define the new custom section
const ResizePanel = {
  name: 'sizes',
  Tab: (props) => (
    <SectionTab name="Resize" {...props}>
      <GiResize icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        {AVAILABLE_SIZES.map(({ width, height }, i) => (
          <Button
            key={i}
            style={{ width: '100%', marginBottom: '20px' }}
            onClick={() => {
              store.setSize(width, height);
            }}
          >
            {width}x{height}
          </Button>
        ))}
      </div>
    );
  }),
};

export default ResizePanel;