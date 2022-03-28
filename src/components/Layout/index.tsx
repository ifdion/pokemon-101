import React, { ReactNode } from "react";

import "./Layout.css";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="layout">
            <div className="layout__container">{children}</div>
        </div>
    );
}
