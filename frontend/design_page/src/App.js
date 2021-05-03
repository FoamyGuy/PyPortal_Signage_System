import './App.css';
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import SidePanel from 'polotno/side-panel/side-panel';
import Workspace from 'polotno/canvas/workspace';
import {createStore} from 'polotno/model/store';
import {polotno_key} from './Polotno_Key'
import {createDemoApp} from "polotno/polotno-app";
import $ from 'jquery';


function App(props) {
    console.log('starting the app...');

    const input_data = $("#root").data("props");
    //console.log(input_data.data.hello);
    //console.dir(JSON.parse(input_data.data));
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    console.log("ajax setup");
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                // Only send the token to relative URLs i.e. locally.
                console.log("ajax setup");
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });

    function getCookie(name) {
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

    function clickSave() {
        console.log(props.hello);
        //console.dir(store);
        console.log("clicked save");
        //console.log(store.toJSON());
        //console.log(store.toDataURL());

        // create new plan
        if (!input_data.data.hasOwnProperty("id")) {
            $.ajax({
                method: "POST",
                url: "/create_plan/",
                data: {
                    "image_base64": store.toDataURL(),
                    "json": JSON.stringify(store.toJSON())
                }
            }).done(function (resp) {
                console.log(resp);
            });
        }else{
            // update existing plan
            $.ajax({
                method: "POST",
                url: "/update/plan/" + input_data.data.id + "/",
                data: {
                    "image_base64": store.toDataURL(),
                    "json": JSON.stringify(store.toJSON())
                }
            }).done(function (resp) {
                console.log(resp);
            });
        }


    }


    /*
    const {store} = createDemoApp({
        container: document.getElementById('root'),
        // this is a demo key just for that project
        // (!) please don't use it in your projects
        // to create your own API key please go here: https://polotno.dev/cabinet
        key: polotno_key,
    });
    return null

     */

    //store.setSize({width: 320, height: 240});
    //store.setSize(320, 240);
    //console.dir(store);


    const store = createStore({
        key: polotno_key, // you can create it here: https://polotno.dev/cabinet/
    });

    console.log(input_data);
    if (input_data.data.hasOwnProperty("plan_json")) {
        //console.log(input_data.data.plan_json);

        console.log(store.activePage);

        // load page from context
        store.loadJSON(JSON.parse(input_data.data.plan_json));
        console.dir(store.pages);
        console.log(store.activePage.id);


    }


    //store.setSize({width: 320, height: 240});
    store.setSize(320, 240);
    //store.addPage();

    return (

        <div
            style={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
            }}
        >
            <button onClick={clickSave}>Save</button>
            <div style={{width: '400px', height: '100%', display: 'flex'}}>
                <SidePanel store={store}/>
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
                <Toolbar store={store} downloadButtonEnabled={true}/>
                <Workspace store={store}/>
                <ZoomButtons store={store}/>
            </div>
        </div>
    );
}

export default App;


