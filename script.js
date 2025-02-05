async function convertToText() {
    const fileInput = document.getElementById("myFile");
    const output = document.getElementById("output");

    if (fileInput.files.length === 0) {
        alert("Please select a PDF file first.");
        return;
    }

    const file = fileInput.files[0];
    console.log(file)
    const fileReader = new FileReader();

    fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            textContent.items.forEach((textItem) => {
                extractedText += textItem.str + " ";
            });

            extractedText += "\n\n"; // Separate pages
        }

        output.textContent = extractedText;
    };

    fileReader.readAsArrayBuffer(file);
}
