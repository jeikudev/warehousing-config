"use client";

import { useState } from "react";
import {
  Warehouse,
  MapPin,
  Box,
  Grid,
  Package,
  Plus,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  const [aisles, setAisles] = useState([
    { id: 1, bays: [{ id: 1, levels: [{ id: 1, bins: [{ id: 1 }] }] }] },
  ]);
  const areas = [
    "Receiving",
    "Inspection",
    "Repair",
    "Supermoving",
    "Slowmoving",
    "Picking",
    "Dispatching",
  ];

  const hubs = ["EANY", "EAPH", "EAID", "EASC", "EAST", "EASE", "EASN"];

  const addAisle = () => {
    setAisles([
      ...aisles,
      {
        id: aisles.length + 1,
        bays: [{ id: 1, levels: [{ id: 1, bins: [{ id: 1 }] }] }],
      },
    ]);
  };

  const addBay = (aisleIndex: number) => {
    const newAisles = [...aisles];
    const aisle = newAisles[aisleIndex];
    aisle.bays.push({
      id: aisle.bays.length + 1,
      levels: [{ id: 1, bins: [{ id: 1 }] }],
    });
    setAisles(newAisles);
  };

  const addLevel = (aisleIndex: number, bayIndex: number) => {
    const newAisles = [...aisles];
    const bay = newAisles[aisleIndex].bays[bayIndex];
    bay.levels.push({ id: bay.levels.length + 1, bins: [{ id: 1 }] });
    setAisles(newAisles);
  };

  const addBin = (aisleIndex: number, bayIndex: number, levelIndex: number) => {
    const newAisles = [...aisles];
    const level = newAisles[aisleIndex].bays[bayIndex].levels[levelIndex];
    level.bins.push({ id: level.bins.length + 1 });
    setAisles(newAisles);
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="bg-gradient-to-r ">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Warehouse className="h-6 w-6" />
            BOND Warehouse Configuration
          </CardTitle>
          <CardDescription className="text-gray-600">
            Configure your warehouse layout and storage structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                Warehouse Hub
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select warehouse hub" />
                </SelectTrigger>
                <SelectContent>
                  {hubs.map((hub) => (
                    <SelectItem key={hub} value={hub.toLowerCase()}>
                      {hub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Grid className="h-4 w-4 text-gray-600" />
                Area
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area.toLowerCase()}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Box className="h-5 w-5 text-gray-600" />
                Storage Configuration
              </h3>
              <Button
                onClick={addAisle}
                variant="outline"
                size="sm"
                className="bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Aisle
              </Button>
            </div>

            <div className="space-y-4">
              {aisles.map((aisle, aisleIndex) => (
                <Collapsible
                  key={aisle.id}
                  className="space-y-2 border rounded-lg p-2 bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <CollapsibleTrigger className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                      <ChevronRight className="h-4 w-4" />
                      <span className="font-medium">Aisle {aisle.id}</span>
                    </CollapsibleTrigger>
                    <Button
                      onClick={() => addBay(aisleIndex)}
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Bay
                    </Button>
                  </div>

                  <CollapsibleContent className="space-y-4 pl-6">
                    {aisle.bays.map((bay, bayIndex) => (
                      <Collapsible
                        key={bay.id}
                        className="space-y-2 border-l-2 border-gray-200 pl-4"
                      >
                        <div className="flex items-center gap-2">
                          <CollapsibleTrigger className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                            <span className="font-medium">Bay {bay.id}</span>
                          </CollapsibleTrigger>
                          <Button
                            onClick={() => addLevel(aisleIndex, bayIndex)}
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-gray-600 hover:bg-gray-100"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Level
                          </Button>
                        </div>

                        <CollapsibleContent className="space-y-4 pl-6">
                          {bay.levels.map((level, levelIndex) => (
                            <Collapsible
                              key={level.id}
                              className="space-y-2 border-l-2 border-gray-100 pl-4"
                            >
                              <div className="flex items-center gap-2">
                                <CollapsibleTrigger className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                                  <ChevronRight className="h-4 w-4" />
                                  <span className="font-medium">
                                    Level {level.id}
                                  </span>
                                </CollapsibleTrigger>
                                <Button
                                  onClick={() =>
                                    addBin(aisleIndex, bayIndex, levelIndex)
                                  }
                                  variant="ghost"
                                  size="sm"
                                  className="ml-auto text-gray-600 hover:bg-gray-100"
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add Bin
                                </Button>
                              </div>

                              <CollapsibleContent className="space-y-2 pl-6">
                                {level.bins.map((bin) => (
                                  <div
                                    key={bin.id}
                                    className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm"
                                  >
                                    <Package className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm font-medium">
                                      Bin {bin.id}
                                    </span>
                                    <Input
                                      placeholder="Enter bin code"
                                      className="ml-auto w-[200px] text-sm"
                                    />
                                  </div>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" className="bg-gray-100 hover:bg-gray-200">
              Cancel
            </Button>
            <Button className="bg-gray-600 hover:bg-gray-700">
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
