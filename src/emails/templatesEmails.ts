export const emailOne = (data: any) => {
  let result;
  return (result = `
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

</html>
<meta content="telephone=no" name="format-detection">
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
<style>
    html {
        margin: 0;
        padding: 0;
        height: 100% !important;
        margin: 0;
        padding: 0;
        width: 100% !important;
        background-color: #F9F9F9 !important;
    }

    body {
        margin: 0;
        padding: 0;
        height: 100% !important;
        margin: 0;
        padding: 0;
        width: 100% !important;
        background-color: #F9F9F9 !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;

        @media only screen and (max-width: 480px) {
            -webkit-text-size-adjust: none !important;
            width: 100% !important;
            min-width: 100% !important;
        }
    }
</style>
<table cellspacing="0" cellpadding="0" border="0" width="100%">
    <td style="padding: 0 20px;">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" align="center" style="max-width: 602px;">
            <tr>
                <td></td>
            </tr>
            <tr>
                <td>
                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #CCCCCC;">
                        <tr>
                            <td style="font-size: 0; background-color: #222; text-align: center; padding: 16px 0;">
                                <div style="display: inline-block;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="300">
                                        <tr>
                                            <td class="u-textFallback"
                                                style="font-weight: bold; text-align: left; font-size: 19px; color: white; padding: 7px 20px; font-family: Montserrat, Arial, sans-serif; line-height: 1.4;">
                                                ${data.note}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display: inline-block;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="300">
                                        <tr>
                                            <td class="u-textFallback"
                                                style="text-align: right; font-size: 14px; color: white; padding: 7px 20px; font-family: Montserrat, Arial, sans-serif; line-height: 1.7;">
                                                Email: ${data.email} <br>Date: ${data.date} </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="font-size: 0; background-color: white; text-align: center; padding: 15px 0 35px;">
                                <div style="display: inline-block; vertical-align: top;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="400"> </table>
                                </div>
                                <div style="display: inline-block; vertical-align: top;">
                                    <table cellspacing="0" cellpadding="0" bor="bor" der="0" width="400">
                                        <tr>
                                            <td style="padding: 15px 20px;">
                                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                    <tr>
                                                        <td class="u-textFallback"
                                                            style="line-height: 1.5; font-family: Montserrat, Arial, sans-serif; border: 1px solid #CCCCCC; background-color: #EDEDED; color: #777777; font-size: 14px; padding: 30px 20px; text-align: left;">
                                                            ${data.status} <p style="font-weight: bold"> <br><br></p>
                                                        </td>
                                                    </tr>
                                                    <tr> </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td height="30">&nbsp;</td>
            </tr>
        </table>
    </td>
</table>
  `);
};
