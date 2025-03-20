"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ZoomIn, ZoomOut, Download, Edit, Save, Share } from "lucide-react";
import { Slider } from "@/components/ui/slider";
// import { toast } from "@/components/ui/use-toast";

export default function ResumeCompletionPage() {
    const [zoom, setZoom] = useState(100);
    const [format, setFormat] = useState("pdf");

    const handleDownload = () => {
        // toast({
        //     title: "Resume downloaded!",
        //     description: `Your resume has been downloaded in ${format.toUpperCase()} format.`,
        // });
    };

    const handleSave = () => {
        // toast({
        //     title: "Resume saved!",
        //     description: "Your changes have been saved to your account.",
        // });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Left Column: Resume Preview */}
                    <div className="md:w-2/3 p-4">
                        <div className="bg-red-100 rounded-lg shadow-inner overflow-hidden" style={{ height: "80vh" }}>
                            <div className="h-full overflow-auto p-4" style={{ zoom: `${zoom}%` }}>
                                {/* Placeholder for actual resume content */}
                                <div className="bg-white p-8 min-h-full">
                                    <h2 className="text-2xl font-bold mb-4">Your Resume</h2>
                                    <p>This is where your beautifully crafted resume will be displayed.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(zoom - 10, 50))}>
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Slider
                                    value={[zoom]}
                                    onValueChange={(value) => setZoom(value[0])}
                                    min={50}
                                    max={150}
                                    step={10}
                                    className="w-32"
                                />
                                <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(zoom + 10, 150))}>
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                            </div>
                            <span className="text-sm text-gray-500">{zoom}%</span>
                        </div>
                    </div>

                    {/* Right Column: Action Panel */}
                    <div className="md:w-1/3 bg-gray-50 p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6">Your resume is ready!</h2>
                        <p className="text-gray-600 mb-8">Make sure to review it before downloading.</p>

                        <div className="space-y-4">
                            <Button className="w-full" size="lg" onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                            <Button className="w-full" variant="outline" size="lg">
                                <Edit className="mr-2 h-4 w-4" /> Edit Resume
                            </Button>
                            <Button className="w-full" variant="secondary" size="lg" onClick={handleSave}>
                                <Save className="mr-2 h-4 w-4" /> Save for Later
                            </Button>
                        </div>

                        <div className="mt-8 space-y-4">
                            <Button className="w-full" variant="ghost">
                                <Share className="mr-2 h-4 w-4" /> Share Resume
                            </Button>

                            <div>
                                <label htmlFor="format-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                                </label>
                                <Select value={format} onValueChange={setFormat}>
                                    <SelectTrigger id="format-select">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                        <SelectItem value="docx">DOCX</SelectItem>
                                        <SelectItem value="txt">TXT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

