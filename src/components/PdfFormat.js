import React from "react";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { ImagePictureAsPdf } from "material-ui/svg-icons";
//import { Download } from "material-ui/svg-icons";


const PdfFormat = ({ payrollId }) => (
    <div className="tc mb4 mt2">
        <div id="myMm" style={{ height: "1mm" }} />
        <div
            onClick={() => {
                // console.log(payrollId)
                const input = document.getElementById(payrollId);
                const pdfInput = document.getElementById(payrollId).innerHTML;
                // console.log(pdfInput);
                const fileName = `${payrollId}.pdf`;
                var doc = new jsPDF("p", "pt", "a4");
                html2canvas(input).then(canvas => {
                    var imgData = canvas.toDataURL("image/png");
                    var pageHeight = 295;
                    var imgWidth = (canvas.width * 50) / 210 - 30;
                    var imgHeight = (canvas.height * imgWidth) / canvas.width;
                    var heightLeft = imgHeight;

                    // console.log(imgWidth);
                    // console.log(imgHeight);
                    doc.addImage(imgData, "PNG", 3, 3, 595, 842);
                    heightLeft -= pageHeight;
                    while (heightLeft >= 0) {

                        doc.addPage();
                        doc.addImage(imgData, "PNG", 3, 3, 595, 842);
                        heightLeft -= pageHeight;
                    }

                    doc.save(fileName);
                });
                if (window.cordova) {
                    let options = {
                        documentSize: "A4",
                        fileName: `${fileName}`,
                        // type: platform === "iOS" ? "share" : "base64"
                        type: "share"
                        // type: "base64"
                    };
                    console.log(pdfInput);
                    window.cordova.plugins.pdf
                        .fromData(pdfInput, options)
                        .catch(err => console.log(err));

                    // if (platform === "Android") {
                    //     // document.addEventListener("resume", onResume, false);
                    //     // function onResume() {
                    //     window.plugins.socialsharing.share(
                    //         "Here is your PDF file",
                    //         "Your PDF",
                    //         `file:///storage/emulated/0/Download/${fileName}`
                    //     );
                    //     // }
                    // }
                }
            }}


        >
            <ImagePictureAsPdf />
        </div>
    </div>
);
export default PdfFormat;