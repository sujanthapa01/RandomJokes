import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CategoryRadio from "../CategoryRadio";
import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

interface JokeOptionsProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const JokeOptions: React.FC<JokeOptionsProps> = ({ isVisible, setVisible }) => {
  const handleClose: React.MouseEventHandler<SVGElement> = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Card className="w-[600px] rounded-md relative p-4 bg-white">
            <CardHeader className="flex justify-between items-center flex-col mt-2">
              <div className="flex justify-end w-full">
                <CgClose onClick={handleClose} className="cursor-pointer text-xl" />
              </div>
              <CardTitle className="flex justify-center w-full">
                <h4>Customize</h4>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-full">
              <CategoryRadio onSave={() => setVisible(false)} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JokeOptions;
