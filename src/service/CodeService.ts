

const codeService = async () => {
  let json = {
      LanguageChoiceWrapper: 1,
      EditorChoiceWrapper: 1,
      LayoutChoiceWrapper: 1,
      Program: `//Microsoft (R) Visual C# Compiler version 3.4.0-beta4-19562-05 (ff930dec)
//Copyright (C) Microsoft Corporation. All rights reserved.


      using System;
      using System.Collections.Generic;
      using System.Linq;
      using System.Text.RegularExpressions;

      namespace Rextester
    {
        public class Program
        {
            public static void Main(string[] args)
        {
            //Your code goes here
            Console.WriteLine("Hello, world!");
        }
    }
    }`,
    Input:"",
    ShowWarnings: false,
    Privacy:"",
    PrivacyUsers:"",
    Title:"",
    SavedOutput:"",
    WholeError:"",
    WholeWarning:"",
    StatsToSave:"",
    CodeGuid:"",
    IsInEditMode: false,
    IsLive: false,
  }
  let body  = JSON.stringify(json);
  let header = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "__utma=178476455.109781385.1687248772.1687248772.1687248772.1; __utmc=178476455; __utmz=178476455.1687248772.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utmb=178476455.1.10.1687248772",
    "Host":"rextester.com",
    "Origin":"https://rextester.com",
    "Referer": "https://rextester.com/"
  }
  let requestInit:RequestInit = {
      method:"POST",
      body:body,
      headers:header
  }
  let response = await fetch("https://rextester.com/rundotnet/Run",requestInit);
  console.log(response.ok);
  console.log(response.text())
}