/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { initializeDOMInteractions } = require("../index.js");

// Initialize the html and DOM
beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8')
    document.documentElement.innerHTML = html
    initializeDOMInteractions()
})

// Test to check the output of clicking the first button
test("Simulate a button click", () => {
    const simClickButton = document.getElementById("simulate-click");
    const output = document.getElementById("dynamic-content");

    simClickButton.click();

    expect(output.textContent).toBe("Button Clicked!")
});

// Test group to test the input box and second button
describe("Output of clicking submit button", () => {
    test("Output what is typed in the input box", () => {
        const form = document.getElementById("user-form");
        const userInput = document.getElementById("user-input");
        const submitButton = form.querySelector("button"); // since the button doesnt have an id, query it from the form
        const output = document.getElementById("dynamic-content");
        userInput.value = "Brad";
        submitButton.click();
        expect(output.textContent).toBe("Brad");
    });

    test("Display an error if button is clicked without anything in input box", () => {
        const form = document.getElementById("user-form");
        const userInput = document.getElementById("user-input");
        const submitButton = form.querySelector("button"); // since the button doesnt have an id, query it from the form
        const output = document.getElementById("dynamic-content");
        const errorMessage = document.getElementById("error-message");
        userInput.value = "";
        submitButton.click();
        errorMessage.classList.remove("hidden"); 
        errorMessage.classList.add("visible");
        expect(errorMessage.textContent).toBe("Input cannot be empty");
    });
});