import React from 'react';
import {observer} from 'mobx-react-lite';
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

import {downloadFile} from 'polotno/utils/download';

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        //const inputRef = React.useRef();
        this.store = props.store;

    }

    render() {
        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <AnchorButton
                        icon="new-object"
                        minimal
                        href={"/create/plan/w"}
                    >
                        New
                    </AnchorButton>

                    <Button
                        icon="floppy-disk"
                        minimal
                        onClick={() => {
                            //const json = store.toJSON();
                            this.props.clickSave();
                        }}
                    >
                        Save
                    </Button>

                    <span
                        className={"feedback-tag bp3-tag bp3-intent-" + this.props.feedbackIntent + (this.props.hidden ? " hidden" : "")}>{this.props.feedback}</span>

                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <AnchorButton
                        minimal
                        href="/docs/"
                        target="_blank"
                        icon={<FaQuestion className="bp3-icon" style={{fontSize: '20px'}}/>}
                    >
                        Help
                    </AnchorButton>

                    <Divider/>
                </Navbar.Group>
            </Navbar>
        );
    }
}

export default TopBar;