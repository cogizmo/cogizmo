(function defineElement() {
    class BasicComponent extends Cogizmo {
        /**
         * Basic constructor template. Typically with no arguments to match
         * other elements
         */
        constructor() {
            // Required
            super();
        }

        /**
         * Called whenever this element is attached to a node in the document.
         */
        connectedCallback() {
            super.connectedCallback();
        }

        /**
         * Called whenever this element is detached from a node in the document.
         */
        disconnectedCallback() {
            super.disconnectedCallback();
        }
    }
    BasicComponent.manage();
}) ();
