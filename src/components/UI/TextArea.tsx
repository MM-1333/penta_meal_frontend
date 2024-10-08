import * as React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    const radius = 320;
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #05D397,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[3px] pt-[0.2px] rounded-lg transition duration-300 group/input"
      >
        <textarea
          className={`flex w-full border-none mt-1 bg-[#272838] text-white shadow-input rounded-md px-3 py-2 text-sm
           placeholder:text-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none transition duration-400
           `}
          ref={ref}
          {...props}
          rows={10}
        ></textarea>
      </motion.div>
    );
  }
);
TextArea.displayName = "Input";

export { TextArea };
