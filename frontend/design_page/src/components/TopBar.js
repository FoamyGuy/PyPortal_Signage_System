import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Navbar,
  Alignment,
  AnchorButton,
  Divider,
  Dialog,
  Classes,
} from '@blueprintjs/core';
import FaGithub from '@meronex/icons/fa/FaGithub';
import FaQuestion from '@meronex/icons/fa/FaQuestion';
import DownloadButton from 'polotno/toolbar/download-button';

import { downloadFile } from 'polotno/utils/download';

export default observer((props ) => {
  const inputRef = React.useRef();
  const store = props.store;

  console.log(props);
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <AnchorButton
          icon="new-object"
          minimal
          href={"/"}
        >
          New
        </AnchorButton>

        <Button
          icon="floppy-disk"
          minimal
          onClick={() => {
            //const json = store.toJSON();
            props.clickSave();
          }}
        >
          Save
        </Button>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <AnchorButton
          minimal
          href="/docs/"
          target="_blank"
          icon={<FaQuestion className="bp3-icon" style={{ fontSize: '20px' }} />}
        >
          Help
        </AnchorButton>

        <Divider />
      </Navbar.Group>
    </Navbar>
  );
});