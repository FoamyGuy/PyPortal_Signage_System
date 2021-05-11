import './App.css';
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import Workspace from 'polotno/canvas/workspace';
import {createStore} from 'polotno/model/store';
import {polotno_key} from './Polotno_Key'
import Topbar from './components/TopBar';

import PhotosPanel from "./components/ImagePanel"
import {PhotosSection} from 'polotno/side-panel/side-panel';
import $ from 'jquery';
import {SidePanel, DEFAULT_SECTIONS} from 'polotno/side-panel/side-panel';
import {SectionTab} from "polotno/side-panel/tab-button";
import React from "react";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";
import {Icon} from '@blueprintjs/core';


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('starting the app...');

        this.store = createStore({
            key: polotno_key, // you can create it here: https://polotno.dev/cabinet/
        });
        this.store.setSize(320, 240);
    }

    componentDidMount() {
        this.input_data = $("#root").data("props");
        //console.log(input_data.data.hello);
        //console.dir(JSON.parse(input_data.data));
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        console.log("ajax setup");
        $.ajaxSetup({
            beforeSend: (xhr, settings) => {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    // Only send the token to relative URLs i.e. locally.
                    console.log("ajax setup");
                    xhr.setRequestHeader("X-CSRFToken", this.getCookie('csrftoken'));
                }
            }
        });


        console.log(this.input_data);
        if (this.input_data !== undefined) {
            if (this.input_data.data.hasOwnProperty("plan_json")) {
                //console.log(input_data.data.plan_json);

                console.log(this.store.activePage);

                // load page from context
                this.store.loadJSON(JSON.parse(this.input_data.data.plan_json));
                console.dir(this.store.pages);
                console.log(this.store.activePage.id);
            }
        }


        //store.addPage();

        setTimeout(function () {
            $(".credit span a").attr("target", "_blank");
        }, 2000);

        this.sections = DEFAULT_SECTIONS;
        console.log("sections: ");
        console.log(DEFAULT_SECTIONS);

        // define the new custom section

        const CustomPhotos = {
            name: 'adafruit',
            Tab: (props) => (
                <SectionTab name="Adafruit" {...props}>
                    <MdPhotoLibrary/>
                </SectionTab>
            ),
            Panel: PhotosPanel,
        };
        this.sections.splice(1, 0, CustomPhotos);

        PhotosSection.Tab = (props) => (
            <SectionTab name="External Photos" {...props}>
                <Icon icon="media"/>
            </SectionTab>
        );

        //removeSection(sections, "size");
        //addSection(sections, ResizePanel, 5);

        this.forceUpdate();
    }

    render() {
        return (
            <React.Fragment>
                <Topbar store={this.store} clickSave={this.clickSave}/>
                <div
                    style={{
                        display: 'flex',
                        height: '100vh',
                        width: '100vw',
                    }}
                >
                    <div style={{width: '400px', height: '100%', display: 'flex'}}>
                        <SidePanel store={this.store} sections={this.sections}/>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            height: '100%',
                            margin: 'auto',
                            flex: 1,
                            flexDirection: 'column',
                            position: 'relative',
                        }}
                    >
                        <Toolbar store={this.store} downloadButtonEnabled={true}/>
                        <Workspace store={this.store}/>
                        <ZoomButtons store={this.store}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    clickSave() {
        //console.log(props.hello);
        //console.dir(store);
        console.log("clicked save");
        //console.log(store.toJSON());
        //console.log(store.toDataURL());

        // create new plan
        if (this.input_data === undefined || !this.input_data.data.hasOwnProperty("id")) {
            $.ajax({
                method: "POST",
                url: "/create_plan/",
                data: {
                    "image_base64": this.store.toDataURL(),
                    "json": JSON.stringify(this.store.toJSON())
                }
            }).done(function (resp) {
                console.log(resp);
            });
        } else {
            // update existing plan
            $.ajax({
                method: "POST",
                url: "/update/plan/" + this.input_data.data.id + "/",
                data: {
                    "image_base64": this.store.toDataURL(),
                    "json": JSON.stringify(this.store.toJSON())
                }
            }).done(function (resp) {
                console.log(resp);
            });
        }
    }
}

export default App;


