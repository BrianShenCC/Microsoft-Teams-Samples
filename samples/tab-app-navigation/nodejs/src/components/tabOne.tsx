// <copyright file="taOne.tsx" company="Microsoft Corporation">
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// </copyright>

import React from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { pages } from "@microsoft/teams-js";

function TabOne() {
    let app = microsoftTeams.app;

    React.useEffect(() => {
        app.initialize().then(app.getContext).then((context: any) => {
            app.notifySuccess();
        });
    });

    // Navigation between tabs within an app.
    const navigateBetweenTabs = () => {
        app.initialize().then(app.getContext).then((context: any) => {
            if (pages.currentApp.isSupported()) {
                const navPromise = pages.currentApp.navigateTo({ pageId: "tab_two", subPageId: "" });
                navPromise.
                    then((result) => console.log("Navigation Successfull", result)).
                    catch((error) => console.log("Navigation Failed", error));
            }
            else {
                const navPromise = pages.navigateToApp({
                    appId: "", pageId: "tab_two"
                });
                navPromise.
                    then((result) => console.log("Navigation Successfull", result)).
                    catch((error) => console.log("Navigation Failed", error));
            }
        });
    }

    // Navigate to default tab
    const onNavigateToDefaultTab = () => {
        app.initialize().then(app.getContext).then((context) => {
            if (pages.currentApp.isSupported()) {
                const navPromise = pages.currentApp.navigateToDefaultPage();
                navPromise.
                    then((result) => { console.log("This is Default Page") }).
                    catch((error) => { console.log("error", error) });
            }
            else {
                console.log("Capability is not supported");
                const navPromise = pages.navigateToApp({ appId: "", pageId: "default_tab", subPageId: "" });
                navPromise.
                    then((result) => { console.log("Navigation Successfull", result) }).
                    catch((error) => { console.log("error", error) });
            }
        });
    }

    // Back button navigation
    const backButtonNavigation = () => {
        if (pages.backStack.isSupported()) {
            pages.backStack.navigateBack();
        }
        else {
            console.log("Capability is not supported")
        }
    }

    return (
        <div className="container">
            <h2>Tab One</h2>
            <button onClick={navigateBetweenTabs}>Tab1 To Tab2</button>
            <br></br><br></br>
            <button onClick={onNavigateToDefaultTab}>Default Tab</button>
            <br></br><br></br>
            <button onClick={backButtonNavigation}>Back Button Navigation</button>
        </div>
    );
};

export default TabOne;
