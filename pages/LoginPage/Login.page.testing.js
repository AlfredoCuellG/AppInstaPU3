import { exportAllDeclaration } from "@babel/types";
import React from "react"; 
import renderer from "react-test-renderer"; 

import Login from "./Login.page";

describe("Testing Login", () => {
    it("Input exists", () => {
        const testt = renderer.create(<Login />).toJSON(); 
        const testRenderer = testt.root;
        expect(testRenderer.type(<StyledButton/>)); 
    });
});

/* describe("Testing Login", () => {
    it("Se renderíza correctamente", () => {
        const testt = renderer.create(<Login />).toJSON(); 
        expect(testt).toMatchSnapshot();
    });
}); */