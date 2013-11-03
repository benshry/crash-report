<?php

class BarcodeController extends BaseController {

    private $path = '/home/jharvard/vhosts/crash-report.com/lib/zxing';

    public function decode()
    {
        $image = base64_decode(Input::get('image'));
        $filename = tempnam('/tmp', 'BR') . '.png';

        file_put_contents($filename, $image);

        $filename = $this->path . '/works.jpg';

        $output = array();

        exec("java -cp {$this->path}/javase-2.2.jar:{$this->path}/core-2.2.jar com.google.zxing.client.j2se.CommandLineRunner $filename", $output);

        $xml = simplexml_load_string($this->toXML($output));
        $this->jsonSuccess($xml);
    }

    private function toXML($aamva)
    {
        return <<<EOT
<AAMVA>
  <user>
    <last e="DCS">Bowden</last>
    <first e="DAC">Robert</first>
    <middle e="DAD">T</middle>
    <dob e="DBB">1991-04-26</dob>
    <eyes e="DAY">BRO</eyes>
    <sex e="DBC">M</sex>
    <height e="DAU">5'10"</height>
    <street e="DAG">16 Master St</street>
    <city e="DAI">Franklin</city>
    <state e="DAJ">NJ</state>
    <postal e="DAK">07416-1520</postal>
    <country e="DCG">USA</country>
    <id e="DAQ">B68766588304912</id>
    <issued e="DBD">2012-03-12</issued>
    <expires e="DBA">2016-04-30</expires>
  </user>
  <head>
    <filetype name="File Type">ANSI</filetype>
    <format name="Data Format">11</format>
    <issuer name="Issuer Identification Number">636036</issuer>
    <state name="Issuer Name">New Jersey</state>
    <st name="Issuer Name Abbreviated">NJ</st>
  </head>
  <subfile designator="DL">
    <element id="DAQ" name="Customer ID Number">B68766588304912</element>
    <element id="DCS" name="Customer Family Name">BOWDEN</element>
    <element id="DDE" name="Family name truncation">U</element>
    <element id="DAC" name="Driver First Name">ROBERT</element>
    <element id="DDF" name="First name truncation">U</element>
    <element id="DAD" name="Driver Middle Name or Initial">T</element>
    <element id="DDG" name="Middle name truncation">U</element>
    <element id="DCA" name="Jurisdiction-specific vehicle class">D</element>
    <element id="DCB" name="Jurisdiction-specific restriction codes">NONE</element>
    <element id="DCD" name="Jurisdiction-specific endorsement codes">NONE</element>
    <element id="DBD" name="Document Issue Date">03122012</element>
    <element id="DBB" name="Date of Birth">04261991</element>
    <element id="DBA" name="Document Expiration Date">04302016</element>
    <element id="DBC" name="Physical Description – Sex">1</element>
    <element id="DAU" name="Physical Description – Height">070 in</element>
    <element id="DAY" name="Physical Description – Eye Color">BRO</element>
    <element id="DAG" name="Address – Street 1">16 MASTER ST</element>
    <element id="DAI" name="Address – City">FRANKLIN</element>
    <element id="DAJ" name="Address – Jurisdiction Code">NJ</element>
    <element id="DAK" name="Address – Postal Code">074161520</element>
    <element id="DCF" name="Document Discriminator">NT201207200000315</element>
    <element id="DCG" name="Country Identification">USA</element>
    <element id="DDA" name="Compliance Type">B</element>
    <element id="DDB" name="Card Revision Date">07232010</element>
  </subfile>
  <subfile designator="ZN">
    <element id="A" name="Optional field A">PR</element>
    <element id="B" name="Optional field B">24.00</element>
    <element id="C" name="Optional field C">REN</element>
    <element id="F" name="Optional field F">BRN</element>
    <element id="G" name="Optional field G">Y</element>
    <element id="H" name="Optional field H">88:AT1XadEHch49TmBVSIuZBOVAgtIedYQZp62WE
A8/2uJblW9mOJWHuP4WUjtsGxYZJiCDEOmFKHU8WYeKmal2Xg==;0329;</element>
  </subfile>
</AAMVA>
EOT;
    }

}

?>
