import React from "react";
import {shallow} from "enzyme";
import Provider from "../src/provider";

jest.mock("socket.io-client", () => () => ({
    socket: "this is a socket"
}));

describe("Test provider", () => {
    const props: ProviderProps = {
        url: 'http://local.test/',
    };

    const getWrapper = () => shallow(Provider);

    it("should match snapshot", () => {
        expect(getWrapper()).toMatchSnapshot();
    });
});
